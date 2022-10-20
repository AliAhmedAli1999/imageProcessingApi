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
// import fs from "fs";
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
const __1 = require("..");
const processImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    const width = +Number(req.query.width);
    const height = +Number(req.query.height);
    if (isNaN(width) || isNaN(height) || width < 0 || height < 0) {
        req.query.status = `the ${isNaN(width) ? "width" : "height"} is not a valid value`;
        __1.status.successed = false;
        res.send(req.query.status);
    }
    else {
        const imagePath = (0, path_1.resolve)(`./images/${name}.jpg`);
        const processedImagePath = (0, path_1.resolve)(`./processed-images/${name}_${width}_${height}.jpg`);
        yield (0, sharp_1.default)(imagePath).resize(width, height).toFile(processedImagePath);
        res.sendFile((0, path_1.resolve)(`./processed-images/${req.query.name}_${width}_${height}.jpg`));
        __1.status.successed = true;
    }
});
exports.default = processImage;
