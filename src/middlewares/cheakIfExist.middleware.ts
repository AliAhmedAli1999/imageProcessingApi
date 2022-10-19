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
    req.query.Exist = "true";
    status.exsit = true;
  } else {
    req.query.Exist = "false";
    req.query.status = "Error, image does not exsit";
    status.exsit = false;
  }
  next();
};

export default cheakIfExist;
