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
const __1 = __importDefault(require(".."));
const resizing_function_1 = __importDefault(require("../functions/resizing.function"));
const removeAllFiles_function_1 = __importDefault(require("../functions/removeAllFiles.function"));
const request = (0, supertest_1.default)(__1.default);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, removeAllFiles_function_1.default)("./processed-images");
}));
describe("testing our endpoints", () => __awaiter(void 0, void 0, void 0, function* () {
    it("check  if the api is working", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/image?name=fjord&width=800&height=120");
        expect(response.status).toBe(200);
    }));
    it("check if the image exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, resizing_function_1.default)("fjord", 200, 200)).not.toBeRejectedWith("the image does not exist");
    }));
    it("check if the image does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, resizing_function_1.default)("fjokrd", 200, 200)).toBeRejectedWith("the image does not exist");
    }));
    it("check if the image processed before", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, resizing_function_1.default)("fjord", 200, 200);
        yield expectAsync((0, resizing_function_1.default)("fjord", 200, 200)).toBeResolvedTo(true);
        yield (0, removeAllFiles_function_1.default)("./processed-images");
    }));
    it("check if the process succeeded and the new image is created ", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/image?name=fjord&width=200&height=440");
        yield expectAsync((0, resizing_function_1.default)("fjord", 200, 200)).toBeResolvedTo(false);
    }));
    it("check if we entered invalid width", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, resizing_function_1.default)("fjord", -200, 200)).toBeRejectedWith("invalid width");
    }));
    it("check if we entered invalid height", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, resizing_function_1.default)("fjord", 200, -200)).toBeRejectedWith("invalid height");
    }));
    it("check if we entered a 0 in the width", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, resizing_function_1.default)("fjord", 0, 200)).toBeRejectedWith("invalid width");
    }));
    it("check if we requested with invalid width", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, resizing_function_1.default)("fjord", 0, 200)).toBeRejectedWith("invalid width");
    }));
    it("check if we requested with invalid width", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, resizing_function_1.default)("fjord", "1", 200)).toBeResolved();
    }));
    it("check if we requested with invalid width", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, resizing_function_1.default)("fjord", "1K", 200)).toBeRejectedWith("invalid width");
    }));
}));
