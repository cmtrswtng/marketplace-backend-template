import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Item } from "./items.model";
import { CreateItemDTO } from "./dto/create.item.dto";
import { Op } from 'sequelize';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item) private itemRepository: typeof Item) {}

  async createItem(dto: CreateItemDTO) {
    const item = await this.itemRepository.create(dto);
    return item;
  }

  async getItem(id: number) {
    const item = await this.itemRepository.findByPk(id);
    return item;
  }

  async getAllItems() {
    const items = await this.itemRepository.findAll();
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
