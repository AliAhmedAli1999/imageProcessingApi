import express from "express";
import fs from "fs";
import { resolve } from "path";
import { status } from "../index";

const cheakIfProcessed = (
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/ban-types
  next: Function
): void => {
  if (req.query.Exist === "true") {
    const name = req.query.name;
    const width = req.query.width as unknown as number;
    const height = req.query.height as unknown as number;
    const path = resolve(`./processed-images/${name}_${width}_${height}.jpg`);
    if (fs.existsSync(path)) {
      req.query.processed = "true";
      req.query.status = "image was prosseced before";
      status.processed = true;
    } else {
      req.query.processed = "false";
      status.processed = false;
    }
  }
  next();
};

export default cheakIfProcessed;
