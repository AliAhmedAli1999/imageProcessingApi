"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import necessary files
const express_1 = __importDefault(require("express"));
const processImage_middleware_1 = __importDefault(require("./middlewares/processImage.middleware"));
// making an express application object
const app = (0, express_1.default)();
const port = 5000;
// define a route handler
app.get("/image", processImage_middleware_1.default, (req, res) => {
    res.end();
});
// start the express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
exports.default = app;
