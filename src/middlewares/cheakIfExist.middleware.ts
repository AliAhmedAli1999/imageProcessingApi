import express from "express";
import fs from "fs";
import { resolve } from "path";
import { status } from "../index";

const cheakIfExist = (
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/ban-types
  next: Function
): void => {
  const name = req.query.name;
  const path = resolve(`./images/${name}.jpg`);
  if (fs.existsSync(path)) {
    status.exsit = true;
    next();
  } else {
    status.exsit = false;
    res.send("the image is not found ");
  }
};

export default cheakIfExist;
