import express from "express";
import http from "http";
import path from "path";
import url from "url";
import fs, { read, readdirSync } from "fs";
import { fileIsExist } from "./server-utils.ts"
import multer from "multer";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

const config = {
  "UPLOAD_FILE_DIR": path.resolve(dirname, "uploadFiles")
};
const regexp = /[-.]/;




const app = express();

app.use(express.json());
app.use(express.urlencoded());

// const requestUploadDetail = async (data: UploadDetailRequest) => {
//   const url = new URL("/upload/detail", BASEULR);
//   url.searchParams.append("md5", data.md5);
//   url.searchParams.append("suffix", data.suffix);
//   return (await fetch(url).then(res => res.json()));
// };



const getUploadPath = ({ md5, suffix }: { md5: string, suffix: string }) => {
  const dirPath = path.resolve(config.UPLOAD_FILE_DIR, md5);
  const filePath = path.resolve(config.UPLOAD_FILE_DIR, `${md5}.${suffix}`);
  return { dirPath, filePath };
};

const saveFile = (file: Express.Multer.File, { md5, chunkName }: { md5: string, chunkName: string }) => {
  const dirPath = path.resolve(config.UPLOAD_FILE_DIR, md5);
  const filePath = path.resolve(dirPath, chunkName);

  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(filePath, Buffer.from(file.buffer));
  return false;
};


const cors = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
};

// /upload/detail
app.get("/upload/detail", cors, async (req, res) => {
  const { md5, suffix } = req.query;
  if (typeof md5 !== "string" || typeof suffix !== "string") {
    res.json({
      code: 400,
      data: "md5 或 suffix 没有传递或不是字符串！",
      timestamp: Date.now(),
    });
    return false;
  }
  const list: string[] = [];
  const data = { isUploaded: false, list };

  const { dirPath, filePath } = getUploadPath({ md5, suffix });

  const isExistDirPath = await fileIsExist(dirPath);
  const isExistFilePath = await fileIsExist(filePath);

  console.log(isExistDirPath, isExistFilePath);
  if (isExistFilePath) {
    //直接说明文件传输结束了
    data.isUploaded = true;
    res.json({
      code: 200,
      data,
      timestamp: Date.now(),
    });
    return false;
  }

  // detail 接口只负责查询状态，不负责创建目录。
  // 目录由实际分片上传(saveFile)时创建，避免“删完又被 detail 重建”的现象。
  data.list = isExistDirPath ? sortUploadFiles(fs.readdirSync(dirPath)) : [];

  res.json({
    data,
    code: 200,
    timestamp: Date.now(),
  });
});


const isChunkUploadAll = (readdirs: string[], chunkCount: number) => {
  const list = readdirs.map((item) => +(item.split(regexp)[1] as string));
  for (let i = 0, len = chunkCount; i < len; i++) {
    console.log(list, i, "list-i", readdirs);
    if (!list.includes(i)) {
      return false;
    }
  }
  return true;
};


const mergeFile = (readirs: string[], dirPath: string, filePath: string) => {
  const sortList = sortUploadFiles(readirs);
  let buffList = [];
  for (const item of sortList) {
    buffList.push(fs.readFileSync(path.resolve(dirPath, item)));
  }
  const ans = Buffer.concat(buffList);
  fs.writeFileSync(filePath, ans);
  console.log(dirPath, "dirPath");
  fs.rmSync(dirPath, {
    recursive: true,
  });
};

const upload = multer();
app.post("/upload/chunk", cors, upload.single("file"), async (req, res) => {
  let md5 = req.body.md5;
  let suffix = req.body.suffix;
  let chunkName = req.body.chunkName;
  let chunkCount = +req.body.chunkCount;
  const filePath = path.resolve(config.UPLOAD_FILE_DIR, `${md5}.${suffix}`);

  if (!req.file) {
    res.json({
      code: 400,
      data: "file 没有传递或不是文件！",
      timestamp: Date.now(),
    });
    return false;
  }

  // 已合并完成时，忽略重复上传请求，防止已删除的分片目录被再次创建。
  console.log(await fileIsExist(filePath), "Sss");
  if (await fileIsExist(filePath)) {
    res.json({
      code: 200,
      data: {
        isUploaded: true,
        curProcess: 1,
      },
      timestamp: Date.now(),
    });
    return false;
  }

  saveFile(req.file, { md5, chunkName });


  //检查所有的chunk是否以及上传完毕
  const dirPath = path.resolve(config.UPLOAD_FILE_DIR, md5);
  const readdirs = fs.readdirSync(dirPath);

  const ans = isChunkUploadAll(readdirs, chunkCount);
  const result = {
    isUploaded: false,
    curProcess: 0,
  };

  console.log(ans, "ans");
  //如果ans为true, 说明所有的chunk都上传完毕了
  if (ans) {
    result.isUploaded = true;
    //合并文件
    mergeFile(readdirs, dirPath, filePath);
  }
  result.curProcess = (+readdirs.length) / req.body.chunkCount;//那这里就是100%了

  res.json({
    code: 200,
    data: result,
    timestamp: Date.now(),
  });
});


function sortUploadFiles(files: string[]) {
  return [...files].sort((a, b) => {
    const aAns = +(a.split(regexp)[1] as string);
    const bAns = +(b.split(regexp)[1] as string);
    return aAns <= bAns ? -1 : 1;
  });
}

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("server is running on port 8083");
});

