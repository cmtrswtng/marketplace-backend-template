import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Item } from "./items.model";
import { CreateItemDTO } from "./dto/create.item.dto";
import { Op } from "sequelize";
import { ImagesService } from "src/images/images.service";
import { CategoriesService } from "src/categories/categories.service";
import {
  alreadyExistMessage,
  doesNotExistMessage,
} from "src/constants/messages";
import { UpdateItemDTO } from "./dto/update.item.dto";

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item) private itemRepository: typeof Item,
    private imageService: ImagesService,
    private categoryService: CategoriesService
  ) {}

  async createItem(dto: CreateItemDTO, photos: []) {
    const category = await this.categoryService.getByPK(dto.categoryId);
    if (!category) {
      throw new NotFoundException(doesNotExistMessage("Категория"));
    }
    const itemExist = await this.itemRepository.findOne({
      where: { article: dto.article },
    });
    if (itemExist) {
      throw new BadRequestException(alreadyExistMessage("Товар", dto.article));
    }
    const images = await this.imageService.createMultipleImages(photos);
    const item = await this.itemRepository.create({
      ...dto,
      photos: images,
    });
    return item;
  }

  async updateItem(itemId: number, dto: UpdateItemDTO, photos: []) {
    const item = await this.getItemByPK(itemId);
    if (!item) {
      throw new NotFoundException(doesNotExistMessage("Товар"));
    }
    if (photos) {
      const images = await this.imageService.createMultipleImages(photos);
      const itemUpdated = await item.update({
        ...dto,
        photos: images,
      });
      return itemUpdated;
    }
    await item.update(dto);
    return item;
  }

  async getItemByPK(id: number) {
    return await this.itemRepository.findByPk(id);
  }

  async getAllItems() {
    return await this.itemRepository.findAll({ include: { all: true } });
  }

  async searchItems(value: string) {
    const items = await this.itemRepository.findAll({
      include: { all: true },
      where: {
        [Op.or]: [
          { article: { [Op.like]: `%${value}%` } },
          { description: { [Op.like]: `%${value}%` } },
        ],
      },
    });

    return items;
  }
}
