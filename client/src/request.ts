const BASEULR = "http://localhost:8080";


export const requestUploadDetail = async (data: UploadDetailRequest): Promise<UploadDetail> => {
  const url = new URL("/upload/detail", BASEULR);
  url.searchParams.append("md5", data.md5);
  url.searchParams.append("suffix", data.suffix);
  return (await fetch(url).then(res => res.json()));
};

export const requestUpload = async (data: uploadChunkRequest): Promise<UploadChunkResponse> => {
  const url = new URL("/upload/chunk", BASEULR);
  const request = new Request(url.toString(), {
    method: "POST",
    body: Object.entries(data).reduce((acc, [key, value]) => (acc.append(key, value) , acc), new FormData())
  });
  return (await fetch(request).then(res => res.json()).then(ans => ans.data));
};


export interface uploadChunkRequest {
  md5: string;
  chunkName: string;
  file: Blob,
  chunkCount: number,
  suffix: string,
}

export interface UploadDetailRequest {
  md5: string;
  suffix: string;
}

export interface Response<T> {
  code: number,
  data:T,
  timestamp: string,
};

export type UploadDetail = Response<{isUploaded: boolean, list: string[]}>;
export type UploadChunkResponse = Response<{isUploaded: boolean, curProcess: number}>;