"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const index_1 = require("../index");
const cheakIfExist = (req, res, 
// eslint-disable-next-line @typescript-eslint/ban-types
next) => {
    const name = req.query.name;
    const path = (0, path_1.resolve)(`./images/${name}.jpg`);
    if (fs_1.default.existsSync(path)) {
        req.query.Exist = "true";
        index_1.status.exsit = true;
    }
    else {
        req.query.Exist = "false";
        req.query.status = "Error, image does not exsit";
        index_1.status.exsit = false;
    }
    next();
};
exports.default = cheakIfExist;