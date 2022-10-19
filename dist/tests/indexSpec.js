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
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("..");
const __2 = require("..");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const requset = (0, supertest_1.default)(__1.app);
describe("testing our endpoints", () => {
    beforeEach(() => {
        const directory = path_1.default.resolve("./processed-images");
        fs_1.default.readdir(directory, (err, files) => {
            if (err)
                throw err;
            for (const file of files) {
                fs_1.default.unlink(path_1.default.join(directory, file), (err) => {
                    if (err)
                        throw err;
                });
            }
        });
    });
    it("cheak  if the api is working", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield requset.get("/image?name=santamonica&width=800&height=120");
        expect(response.status).toBe(200);
    }));
    it("cheak if the image exsits", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset.get("/image?name=fjord");
        expect(__2.status.exsit).toBe(true);
    }));
    it("cheak if the image does not exsit", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset.get("/image?name=f2jord");
        expect(__2.status.exsit).toBe(false);
    }));
    it("cheak if the image processed before", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset.get("/image?name=fjord&width=200&height=440");
        yield requset.get("/image?name=fjord&width=200&height=440");
        expect(__2.status.processed).toBe(true);
    }));
    it("cheak if the image processed before but with diffrent dimansions", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset.get("/image?name=fjord&width=200&height=440");
        yield requset.get("/image?name=fjord&width=200&height=450");
        expect(__2.status.processed).toBe(false);
    }));
    it("cheak if the process successed and the new image is created ", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset.get("/image?name=fjord&width=200&height=440");
        expect(__2.status.successed).toBe(true);
    }));
    it("cheak if we enterd invalid width", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset.get("/image?name=fjord&width=200d&height=40");
        expect(__2.status.successed).toBe(false);
    }));
    it("cheak if we enterd invalid heigt", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset.get("/image?name=fjord&width=200&height=4s0");
        expect(__2.status.successed).toBe(false);
    }));
    it("cheak if we enterd invalid heigt and width", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset.get("/image?name=fjord&width=20d0&height=4s0");
        expect(__2.status.successed).toBe(false);
    }));
});
