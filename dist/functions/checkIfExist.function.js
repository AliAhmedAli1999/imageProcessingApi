"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const checkIfExist = (name) => {
    const path = (0, path_1.resolve)(`./images/${name}.jpg`);
    if (fs_1.default.existsSync(path)) {
        return true;
    }
    else {
        throw "the image does not exist";
    }
};
exports.default = checkIfExist;
