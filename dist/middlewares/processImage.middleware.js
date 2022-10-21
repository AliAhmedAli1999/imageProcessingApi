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
const resizing_function_1 = __importDefault(require("../functions/resizing.function"));
const processImage = (req, res
// eslint-disable-next-line @typescript-eslint/ban-types
) => __awaiter(void 0, void 0, void 0, function* () {
    const name = String(req.query.name);
    const width = +Number(req.query.width);
    const height = +Number(req.query.height);
    try {
        yield (0, resizing_function_1.default)(name, width, height);
        res.sendFile((0, path_1.resolve)(`./processed-images/${req.query.name}_${width}_${height}.jpg`));
    }
    catch (err) {
        res.send(err);
    }
});
exports.default = processImage;
