import express from "express";
import { resolve } from "path";
import resizing from "../functions/resizing.function";

const processImage = async (
  req: express.Request,
  res: express.Response
  // eslint-disable-next-line @typescript-eslint/ban-types
): Promise<void> => {
  const name = String(req.query.name);
  const width = +Number(req.query.width);
  const height = +Number(req.query.height);
  try {
    await resizing(name, width, height);
    res.sendFile(
      resolve(`./processed-images/${req.query.name}_${width}_${height}.jpg`)
    );
  } catch (err) {
    res.send(err);
  }
};

export default processImage;
