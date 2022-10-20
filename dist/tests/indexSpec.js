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
const request = (0, supertest_1.default)(__1.app);
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
    it("check  if the api is working", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/image?name=santamonica&width=800&height=120");
        expect(response.status).toBe(200);
    }));
    it("check if the image exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/image?name=fjord");
        expect(__2.status.exsit).toBe(true);
    }));
    it("check if the image does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/image?name=f2jord");
        expect(__2.status.exsit).toBe(false);
    }));
    it("check if the image processed before", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/image?name=fjord&width=200&height=440");
        yield request.get("/image?name=fjord&width=200&height=440");
        expect(__2.status.processed).toBe(true);
    }));
    it("check if the image processed before but with different dimensions", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/image?name=fjord&width=200&height=440");
        yield request.get("/image?name=fjord&width=200&height=450");
        expect(__2.status.processed).toBe(false);
    }));
    it("check if the process succeeded and the new image is created ", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/image?name=fjord&width=200&height=440");
        expect(__2.status.successed).toBe(true);
    }));
    it("check if we entered invalid width", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/image?name=fjord&width=200d&height=40");
        expect(__2.status.successed).toBe(false);
    }));
    it("check if we entered invalid height", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/image?name=fjord&width=200&height=4s0");
        expect(__2.status.successed).toBe(false);
    }));
    it("check if we entered invalid height and width", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/image?name=fjord&width=20d0&height=4s0");
        expect(__2.status.successed).toBe(false);
    }));
    it("check if we entered negative width", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/image?name=fjord&width=20d0&height=-40");
        expect(__2.status.successed).toBe(false);
    }));
    it("check if we entered a 0 before the  width", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/image?name=fjord&width=200&height=040");
        expect(__2.status.successed).toBe(true);
    }));
});
