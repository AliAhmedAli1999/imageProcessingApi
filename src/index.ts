// import necessary files
import express from "express";
import processImage from "./middlewares/processImage.middleware";

// making an express application object

const app = express();
const port = 5000;
// define a route handler
app.get("/image", processImage, (req, res) => {
  res.end();
});

// start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
