import express from "express";
// import fs from "fs";
import { resolve } from "path";
import sharp from "sharp";
import { status } from "..";

const processImage = async (
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/ban-types
  next: Function
): Promise<void> => {
  if (req.query.processed == "false") {
    const name = req.query.name;

    const width = Number(req.query.width);
    const height = Number(req.query.height);
    if (isNaN(width) || isNaN(height)) {
      req.query.status = `the ${
        isNaN(width) ? "width" : "height"
      } is not a valid value`;
      status.successed = false;
      next();
    } else {
      const imagePath = resolve(`./images/${name}.jpg`);
      const processedImagePath = resolve(
        `./processed-images/${name}_${width}_${height}.jpg`
      );
      await sharp(imagePath).resize(width, height).toFile(processedImagePath);
      req.query.status = "successed";
      status.successed = true;
    }
  }

  next();
};

export default processImage;
