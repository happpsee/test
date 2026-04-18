export function addEventListener(ele: HTMLElement, eventName:string, handler: EventListenerOrEventListenerObject) {
  ele.addEventListener(eventName, handler);
}


export function createEle(tagName:string) {
  return window.document.createElement(tagName);
}

export function $$ (query: string) {
  return window.document.querySelector(query);
}

export function fileRead(file:File) {
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(file);

  return new Promise((resolve, reject) => {
    fileReader.addEventListener("loadend", () => {
      resolve(fileReader.result);
    });
    fileReader.addEventListener("error", () => {
      reject(fileReader.error);
    });
  });
}

//能够限制并发数量的吏部任务
export async function parallelTask(source: Function[], ctx: {limit: number, setProcess: (process: number) => void}) {

  const limit = ctx.limit;
  const tasks = [...source];
  let processing = 0;
  let completed = false;


  const _run = async (resolve:any, reject: any) => {
    if (processing === 0 && tasks.length <= 0) {
      resolve();
      return false;
    }

    if (completed || processing >= limit || tasks.length <= 0) {
      return false;
    }
    processing++;
    _run(resolve, reject); //开启limit个任务

    let ans;
    try {
      const task = tasks.shift() as () => Promise<any>; //拿出任务
      ans = await task();//执行  
      if (ans.isUploaded) {
        completed = ans.isUploaded;
        resolve();//结束
      }
    } catch (err) {
      completed = true;//上传错误也算你结束
      reject(Error("上传失败!!!"));
    } finally {
      processing--;
      ctx.setProcess(Number(ans.curProcess));
      _run(resolve, reject);
    }
  };

  return new Promise((resolve, reject) => {
    if (tasks.length <= 0) {
      resolve(null);
      return false;
    }
    _run(resolve, reject);
  });

}

