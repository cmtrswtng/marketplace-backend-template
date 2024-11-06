import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
  HasMany,
} from "sequelize-typescript";
import { Item } from "src/items/items.model";
import { Review } from "src/reviews/reviews.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user.roles.model";
import { UserCart } from "./cart/user.cart.model";
import { UserFavourite } from "./favourite/user.favourite";

interface UserCreationAttrs {
  phone: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: "ID" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "9975556655",
    description: "Номер телефона",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({ example: "password", description: "Пароль" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @HasMany(() => Review)
  @ApiProperty({
    description: "Отзывы пользователя",
    type: () => [Review],
  })
  reviews: Review[];

  @BelongsToMany(() => Role, () => UserRoles)
  @ApiProperty({
    description: "Роли пользователя",
    type: () => [Role],
  })
  roles: Role[];

  @BelongsToMany(() => Item, () => UserCart)
  @ApiProperty({
    description: "Корзина пользователя",
    type: () => [Item],
  })
  cart: Item[];

  @BelongsToMany(() => Item, () => UserFavourite)
  @ApiProperty({
    description: "Избранное пользователя",
    type: () => [Item],
  })
  favourite: Item[];
}
