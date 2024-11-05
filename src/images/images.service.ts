import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";

@Injectable()
export class ImagesService {
  async createImage(image): Promise<string> {
    try {
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, "..", "static");
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), image.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        "Произошла ошибка при записи изображений",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  async createMultipleImages(photos: []) {
    return await Promise.all(
      photos.map(async (image) => {
        return await this.createImage(image);
      })
    );
  }
}
