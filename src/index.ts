// import necessary files
import express from "express";
import cheakIfExist from "./middlewares/cheakIfExist.middleware";
import cheakIfProcessed from "./middlewares/cheakIfProcessed";
import processImage from "./middlewares/processImage.middleware";
import { resolve } from "path";

// making an express application object

const app = express();
const port = 5000;

const status = {
  exsit: true,
  processed: true,
  successed: true,
};
// define a route handler
app.get("/image", cheakIfExist, cheakIfProcessed, processImage, (req, res) => {
  if (
    req.query.status === "successed" ||
    req.query.status === "image was prosseced before"
  ) {
    res.sendFile(
      resolve(
        `./processed-images/${req.query.name}_${req.query.width}_${req.query.height}.jpg`
      )
    );
  } else {
    res.send(req.query.status);
  }
});

// start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export { app, status };
