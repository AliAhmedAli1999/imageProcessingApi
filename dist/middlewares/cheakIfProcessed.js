"use strict";
// import express from "express";
// import fs from "fs";
// import { resolve } from "path";
// import { status } from "../index";
// const cheakIfProcessed = (
//   req: express.Request,
//   res: express.Response,
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   next: Function
// ): void => {
//   const name = req.query.name;
//   const width = +Number(req.query.width);
//   const height = +Number(req.query.height);
//   const path = resolve(`./processed-images/${name}_${width}_${height}.jpg`);
//   if (fs.existsSync(path)) {
//     req.query.processed = "true";
//     req.query.status = "image was prosseced before";
//     status.processed = true;
//     res.sendFile(
//       resolve(
//         `./processed-images/${req.query.name}_${req.query.width}_${req.query.height}.jpg`
//       )
//     );
//   } else {
//     status.processed = false;
//     next();
//   }
// };
// export default cheakIfProcessed;
