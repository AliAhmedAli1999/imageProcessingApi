import fs from "fs";
import path from "path";
const removeAllFiles = async (Path: string): Promise<void> => {
  const directory = path.resolve(Path);
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
};

export default removeAllFiles;
