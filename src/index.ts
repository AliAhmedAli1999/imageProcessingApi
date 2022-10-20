// import necessary files
import express from "express";
import cheakIfExist from "./middlewares/cheakIfExist.middleware";
import cheakIfProcessed from "./middlewares/cheakIfProcessed";
import processImage from "./middlewares/processImage.middleware";

// making an express application object

const app = express();
const port = 5000;

const status = {
  exsit: false,
  processed: false,
  successed: false,
};
// define a route handler
app.get("/image", cheakIfExist, cheakIfProcessed, processImage, () => {
  console.log("finshed");
});

// start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export { app, status };
