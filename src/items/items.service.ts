import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Item } from "./items.model";
import { CreateItemDTO } from "./dto/create.item.dto";
import { Op } from "sequelize";
import { ImagesService } from "src/images/images.service";

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item) private itemRepository: typeof Item,
    private imageService: ImagesService
  ) {}

  async createItem(dto: CreateItemDTO, photos: []) {
    const images: string[] = await Promise.all(
      photos.map(async (image) => {
        return await this.imageService.createImage(image);
      })
    );
    const item = await this.itemRepository.create({
      ...dto,
      photos: images,
    });
    return item;
  }

  async getItemByPK(id: number) {
    const item = await this.itemRepository.findByPk(id);
    return item;
  }

  async getAllItems() {
    const items = await this.itemRepository.findAll();
    return items;
  }

  async searchItems(value: string) {
    const items = await this.itemRepository.findAll({
      where: {
        [Op.or]: [
          { article: { [Op.like]: `%${value}%` } },
          { description: { [Op.like]: `%${value}%` } },
        ],
      },
    });
  }
}
