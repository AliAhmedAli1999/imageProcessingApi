import supertest from "supertest";
import { app } from "..";
import { status } from "..";
import fs from "fs";
import path from "path";

const request = supertest(app);

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
  it("check  if the api is working", async () => {
    const response = await request.get(
      "/image?name=santamonica&width=800&height=120"
    );
    expect(response.status).toBe(200);
  });
  it("check if the image exists", async () => {
    await request.get("/image?name=fjord");
    expect(status.exsit).toBe(true);
  });
  it("check if the image does not exists", async () => {
    await request.get("/image?name=f2jord");
    expect(status.exsit).toBe(false);
  });
  it("check if the image processed before", async () => {
    await request.get("/image?name=fjord&width=200&height=440");
    await request.get("/image?name=fjord&width=200&height=440");
    expect(status.processed).toBe(true);
  });
  it("check if the image processed before but with different dimensions", async () => {
    await request.get("/image?name=fjord&width=200&height=440");
    await request.get("/image?name=fjord&width=200&height=450");
    expect(status.processed).toBe(false);
  });
  it("check if the process succeeded and the new image is created ", async () => {
    await request.get("/image?name=fjord&width=200&height=440");
    expect(status.successed).toBe(true);
  });
  it("check if we entered invalid width", async () => {
    await request.get("/image?name=fjord&width=200d&height=40");
    expect(status.successed).toBe(false);
  });
  it("check if we entered invalid height", async () => {
    await request.get("/image?name=fjord&width=200&height=4s0");
    expect(status.successed).toBe(false);
  });
  it("check if we entered invalid height and width", async () => {
    await request.get("/image?name=fjord&width=20d0&height=4s0");
    expect(status.successed).toBe(false);
  });
  it("check if we entered negative width", async () => {
    await request.get("/image?name=fjord&width=20d0&height=-40");
    expect(status.successed).toBe(false);
  });
  it("check if we entered a 0 before the  width", async () => {
    await request.get("/image?name=fjord&width=200&height=040");
    expect(status.successed).toBe(true);
  });
});
