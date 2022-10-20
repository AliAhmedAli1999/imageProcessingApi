import express from "express";
// import fs from "fs";
import { resolve } from "path";
import sharp from "sharp";
import { status } from "..";

const processImage = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const name = req.query.name;

  const width = +Number(req.query.width);
  const height = +Number(req.query.height);
  if (isNaN(width) || isNaN(height) || width < 0 || height < 0) {
    req.query.status = `the ${
      isNaN(width) ? "width" : "height"
    } is not a valid value`;
    status.successed = false;
    res.send(req.query.status);
  } else {
    const imagePath = resolve(`./images/${name}.jpg`);
    const processedImagePath = resolve(
      `./processed-images/${name}_${width}_${height}.jpg`
    );
    await sharp(imagePath).resize(width, height).toFile(processedImagePath);
    res.sendFile(
      resolve(`./processed-images/${req.query.name}_${width}_${height}.jpg`)
    );
    status.successed = true;
  }
};

export default processImage;
