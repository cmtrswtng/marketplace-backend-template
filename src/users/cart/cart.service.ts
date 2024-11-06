import { Injectable, NotFoundException } from "@nestjs/common";
import { doesNotExistMessage } from "src/constants/messages";
import { Item } from "src/items/items.model";
import { UserCart } from "./user.cart.model";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../user.model";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Item) private itemModel: typeof Item,
    @InjectModel(UserCart) private userCartRepository: typeof UserCart
  ) {}

  async addItemToCart(userId: number, itemId: number): Promise<UserCart> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(doesNotExistMessage("Пользователь"));
    }

    const item = await this.itemModel.findByPk(itemId);
    if (!item) {
      throw new NotFoundException(doesNotExistMessage("Товар"));
    }

    return this.userCartRepository.create({ userId, itemId });
  }

  async removeItemFromCart(userId: number, itemId: number): Promise<void> {
    const userCart = await this.userCartRepository.findOne({
      where: { userId, itemId },
    });

    if (!userCart) {
      throw new NotFoundException(
        `Товар с ID ${itemId} не найден в корзине пользователя с ID ${userId}`
      );
    }

    await userCart.destroy();
  }

  async getUserCart(userId: number): Promise<Item[]> {
    const user = await this.userModel.findByPk(userId, {
      include: [{ model: Item, through: { attributes: [] } }],
    });

    if (!user) {
      throw new NotFoundException(doesNotExistMessage("Пользователь"));
    }

    return user.cart;
  }
}
