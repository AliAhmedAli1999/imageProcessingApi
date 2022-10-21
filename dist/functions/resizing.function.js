"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const resizing = (name, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    name = String(name);
    width = +Number(width);
    height = +Number(height);
    const originalImage = (0, path_1.resolve)(`./images/${name}.jpg`);
    if (!fs_1.default.existsSync(originalImage))
        throw "the image does not exist"; //check first if the image exist
    if (width <= 0 ||
        height <= 0 ||
        Object.is(width, NaN) ||
        Object.is(height, NaN))
        throw `invalid ${(width <= 0) || (Object.is(width, NaN)) ? "width" : "height"}`; // check if the inputs are valid
    const processedImagePath = (0, path_1.resolve)(`./processed-images/${name}_${width}_${height}.jpg`);
    if (fs_1.default.existsSync(processedImagePath))
        return true;
    else {
        yield (0, sharp_1.default)(originalImage).resize(width, height).toFile(processedImagePath);
        return false;
    }
});
exports.default = resizing;
