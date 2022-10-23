import { resolve } from "path";
import sharp from "sharp";
import fs from "fs";
import { ParsedQs } from "qs";
const resizing = async (
  name: string | string[] | ParsedQs | ParsedQs[] | undefined,
  width: number | string | null | undefined | ParsedQs | ParsedQs[],
  height: number | string | null | undefined | ParsedQs | ParsedQs[]
): Promise<boolean> => {
  name = String(name);
  width = +Number(width);
  height = +Number(height);
  const originalImage = resolve(`./images/${name}.jpg`);
  if (!fs.existsSync(originalImage)) throw "the image does not exist"; //check first if the image exist
  if (
    width <= 0 ||
    height <= 0 ||
    Object.is(width, NaN) ||
    Object.is(height, NaN)
  )
    throw `invalid ${width <= 0 || Object.is(width, NaN) ? "width" : "height"}`; // check if the inputs are valid
  const processedImagePath = resolve(
    `./processed-images/${name}_${width}_${height}.jpg`
  );
  if (fs.existsSync(processedImagePath)) return true;
  else {
    await sharp(originalImage).resize(width, height).toFile(processedImagePath);
    return false;
  }
};

export default resizing;
