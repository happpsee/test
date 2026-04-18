import fs from "fs/promises";



export const fileIsExist = (path:string):Promise<boolean> => {
  return new Promise((resolve) => {
    fs.access(path)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
};

