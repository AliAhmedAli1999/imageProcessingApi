import supertest from "supertest";
import { app } from "..";
import resizing from "../functions/resizing.function";
import removeAllFiles from "../functions/removeAllFiles.function";

const request = supertest(app);

describe("testing our endpoints", async () => {
  it("check  if the api is working", async () => {
    await removeAllFiles("./processed-images");
    const response = await request.get(
      "/image?name=fjord&width=800&height=120"
    );
    expect(response.status).toBe(200);
  });
  it("check if the image exists", async () => {
    await expectAsync(resizing("fjord", 200, 200)).not.toBeRejectedWith(
      "the image does not exist"
    );
  });
  it("check if the image does not exists", async () => {
    await expectAsync(resizing("fjokrd", 200, 200)).toBeRejectedWith(
      "the image does not exist"
    );
  });
  it("check if the image processed before", async () => {
    await removeAllFiles("./processed-images");
    await resizing("fjord", 200, 200);
    await expectAsync(resizing("fjord", 200, 200)).toBeResolvedTo(true);
  });
  it("check if the process succeeded and the new image is created ", async () => {
    await request.get("/image?name=fjord&width=200&height=440");
    await expectAsync(resizing("fjord", 200, 200)).toBeResolvedTo(false);
    await removeAllFiles("./processed-images");
  });
  it("check if we entered invalid width", async () => {
    await removeAllFiles("./processed-images");
    await expectAsync(resizing("fjord", -200, 200)).toBeRejectedWith(
      "invalid width"
    );
  });
  it("check if we entered invalid height", async () => {
    await removeAllFiles("./processed-images");
    await expectAsync(resizing("fjord", 200, -200)).toBeRejectedWith(
      "invalid height"
    );
  });

  it("check if we entered a 0 in the width", async () => {
    await removeAllFiles("./processed-images");
    await expectAsync(resizing("fjord", 0, 200)).toBeRejectedWith(
      "invalid width"
    );
  });
  it("check if we requested with invalid width", async () => {
    await removeAllFiles("./processed-images");
    await expectAsync(resizing("fjord", 0, 200)).toBeRejectedWith(
      "invalid width"
    );
  });
});
