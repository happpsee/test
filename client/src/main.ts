
import "./lib/nprogress.css";
import "./lib/nprogress.js";
import "./lib/layui/css/layui.css";
import "./lib/sparkMD5/spark-md5.js";
import {requestUpload, requestUploadDetail, type  uploadChunkRequest, type UploadDetailRequest} from "./request.js";
import {addEventListener, createEle, $$, fileRead, parallelTask} from "./utils.js";


const processEle = document.querySelector("[data-action='upload-progress']") as HTMLElement;

let globalCtx = new Proxy({
  loading: false,
  process: 0
}, {
  set(target, prop, value, receiver) {
    console.log(prop, value, "prop-value");
    if (prop === "loading") {
      if (value) {
        window.NProgress.start();
      } else {
        console.log("执行了");
        window.NProgress.done();
      }
    } else if (prop === "process") {
      processEle.style.width = `${value}%`;
    }

    return Reflect.set(target, prop, value, receiver);
  }
});



const getFileMdAndName = async (file: File) => {
  const  [name, suffix]  =  file.name.split(".");

  if (typeof suffix !== "string" || typeof name !== "string") {
    throw new Error("没有文件后缀!");
  }

  const sparkmd = new window.SparkMD5.ArrayBuffer();
  const buffer = await fileRead(file);
  sparkmd.append(buffer);
  const md5:string = sparkmd.end();

  return {md5, suffix, name};
}

const getChunk = (list:string[], ctx: ChunkCtx) => {
  const result = [];
  let start = -1;
  const end = ctx.end;

  while (++start < end) {
    if (list.includes(ctx.sliceChunkName(start))) {
      continue;
    }
    const chunk = ctx.slice(start);
    result.push(chunk);
  }

  return result;
}

const getChunkSize = (fileSize: number) => {
  const defaultSize = 1024 * 1024;//1M
  const defaultCount = 100;//默认100片
  const maxCount = Math.ceil(fileSize / defaultSize);
  const maxSize = Math.ceil(fileSize / defaultCount);

  return maxCount > defaultCount ? maxSize : defaultSize;
}

const handleUploadFile = async (file: File) => {
  //根据文件名计算出md5和后缀
  globalCtx.loading = true;
  globalCtx.process = 0;
  const {md5, suffix} = await getFileMdAndName(file);
  const { data: {isUploaded, list } } = await requestUploadDetail({md5, suffix});

  if (isUploaded) {
    console.log("上传完毕");
    globalCtx.process = 100;
    globalCtx.loading = false;
    return false;
  }
  
  const chunkSize = getChunkSize(file.size);
  const chunkList = getChunk(list, {
    end: Math.ceil(file.size / chunkSize),
    sliceChunkName(start: number) {
      return `${md5}-${start}.${suffix}`;
    },
    slice(start: number) {
      return {
        chunkCount: this.end,
        file: file.slice(start * chunkSize, (start + 1) * chunkSize),
        chunkName: this.sliceChunkName(start),
        md5,
        suffix,
      };
  }});



  await parallelTask(chunkList.map(item =>() => requestUpload(item)), {
    limit: 3, 
    setProcess: (process:number) => {
      console.log(process, "process是什么啊");
    globalCtx.process = process * 100;
  }});

  globalCtx.loading = false;
}


const uploadBtn = $$("#page button[data-action='upload-btn']") as HTMLButtonElement;

const uploadBtnHandler = {
  el: uploadBtn,
  handleEvent(event: Event) {
    let type = event.type as keyof typeof uploadBtnHandler;
    if (!(this[type] && typeof this[type] === "function")) {
      return false;
    }
    this[type](event);
  },
  click() {
    if (globalCtx.loading) {
      return false;
    }
    fileInput.click();
  }

};

const fileInput = createEle("input") as HTMLInputElement;
fileInput.type = "file";
const fileChangeHandler = {
  el: fileInput,
  handleEvent(event: Event) {
    let type = event.type as keyof typeof fileChangeHandler;
    if (!(this[type] && typeof this[type] === "function")) {
      return false;
    }
    this[type](event);
  },
  change(event:Event){
    console.log(event, "change");
    if (!(this.el.files && this.el.files[0])) {
      return false;
    }

    handleUploadFile(this.el.files[0]);
  }
};

addEventListener(uploadBtn, "click", uploadBtnHandler);
addEventListener(fileInput, "change", fileChangeHandler);


// name : "asome.jpeg"
// size:  487080
// type : "image/jpeg"
interface ChunkCtx {
  end: number;
  sliceChunkName: (start: number) => string;
  slice: (start: number) =>  uploadChunkRequest
}


declare global {
  interface Window {
    NProgress: any;
    SparkMD5: any;
  }
}

