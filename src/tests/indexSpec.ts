import supertest from "supertest";
import { app } from "..";
import { status } from "..";
import fs from "fs";
import path from "path";

const requset = supertest(app);

describe("testing our endpoints", () => {
  beforeEach(() => {
    const directory = path.resolve("./processed-images");
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });
  });
  it("cheak  if the api is working", async () => {
    const response = await requset.get(
      "/image?name=santamonica&width=800&height=120"
    );
    expect(response.status).toBe(200);
  });
  it("cheak if the image exsits", async () => {
    await requset.get("/image?name=fjord");
    expect(status.exsit).toBe(true);
  });
  it("cheak if the image does not exsit", async () => {
    await requset.get("/image?name=f2jord");
    expect(status.exsit).toBe(false);
  });
  it("cheak if the image processed before", async () => {
    await requset.get("/image?name=fjord&width=200&height=440");
    await requset.get("/image?name=fjord&width=200&height=440");
    expect(status.processed).toBe(true);
  });
  it("cheak if the image processed before but with diffrent dimensions", async () => {
    await requset.get("/image?name=fjord&width=200&height=440");
    await requset.get("/image?name=fjord&width=200&height=450");
    expect(status.processed).toBe(false);
  });
  it("cheak if the process successed and the new image is created ", async () => {
    await requset.get("/image?name=fjord&width=200&height=440");
    expect(status.successed).toBe(true);
  });
  it("cheak if we enterd invalid width", async () => {
    await requset.get("/image?name=fjord&width=200d&height=40");
    expect(status.successed).toBe(false);
  });
  it("cheak if we enterd invalid height", async () => {
    await requset.get("/image?name=fjord&width=200&height=4s0");
    expect(status.successed).toBe(false);
  });
  it("cheak if we enterd invalid height and width", async () => {
    await requset.get("/image?name=fjord&width=20d0&height=4s0");
    expect(status.successed).toBe(false);
  });
  it("cheak if we enterd negative width", async () => {
    await requset.get("/image?name=fjord&width=20d0&height=-40");
    expect(status.successed).toBe(false);
  });
  it("cheak if we enterd a 0 before the  width", async () => {
    await requset.get("/image?name=fjord&width=200&height=040");
    expect(status.successed).toBe(true);
  });
});
