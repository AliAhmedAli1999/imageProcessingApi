"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const index_1 = require("../index");
const cheakIfProcessed = (req, res, 
// eslint-disable-next-line @typescript-eslint/ban-types
next) => {
    const name = req.query.name;
    const width = +Number(req.query.width);
    const height = +Number(req.query.height);
    const path = (0, path_1.resolve)(`./processed-images/${name}_${width}_${height}.jpg`);
    if (fs_1.default.existsSync(path)) {
        req.query.processed = "true";
        req.query.status = "image was prosseced before";
        index_1.status.processed = true;
        res.sendFile((0, path_1.resolve)(`./processed-images/${req.query.name}_${req.query.width}_${req.query.height}.jpg`));
    }
    else {
        index_1.status.processed = false;
        next();
    }
};
exports.default = cheakIfProcessed;
