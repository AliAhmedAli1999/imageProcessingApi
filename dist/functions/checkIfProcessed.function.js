"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const checkIfProcessed = (name, width, height) => {
    if (width <= 0 ||
        height <= 0 ||
        Object.is(width, NaN) ||
        Object.is(height, NaN))
        throw `invalid ${width <= 0 ? "width" : "height"}`;
    const path = (0, path_1.resolve)(`./processed-images/${name}_${width}_${height}.jpg`);
    if (fs_1.default.existsSync(path)) {
        return true;
    }
    else
        return false;
};
exports.default = checkIfProcessed;
