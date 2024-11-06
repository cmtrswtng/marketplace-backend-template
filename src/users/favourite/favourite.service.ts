import { Injectable, NotFoundException } from "@nestjs/common";
import { doesNotExistMessage } from "src/constants/messages";
import { Item } from "src/items/items.model";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../user.model";
import { UserFavourite } from "./user.favourite";

@Injectable()
export class FavouriteService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Item) private itemModel: typeof Item,
    @InjectModel(UserFavourite)
    private userFavouriteRepository: typeof UserFavourite
  ) {}

  async addItemToFavourite(
    userId: number,
    itemId: number
  ): Promise<UserFavourite> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(doesNotExistMessage("Пользователь"));
    }

    const item = await this.itemModel.findByPk(itemId);
    if (!item) {
      throw new NotFoundException(doesNotExistMessage("Товар"));
    }

    return this.userFavouriteRepository.create({ userId, itemId });
  }

  async removeItemFromFavourite(userId: number, itemId: number): Promise<void> {
    const userCart = await this.userFavouriteRepository.findOne({
      where: { userId, itemId },
    });

    if (!userCart) {
      throw new NotFoundException(
        `Товар с ID ${itemId} не найден в корзине пользователя с ID ${userId}`
      );
    }

    await userCart.destroy();
  }

  async getUserFavourite(userId: number): Promise<Item[]> {
    const user = await this.userModel.findByPk(userId, {
      include: [{ model: Item, through: { attributes: [] } }],
    });

    if (!user) {
      throw new NotFoundException(doesNotExistMessage("Пользователь"));
    }

    return user.cart;
  }
}
