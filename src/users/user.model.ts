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

  @ApiProperty({
    description: "Корзина пользователя с товарами",
    type: () => [Item],
  })
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: true,
  })
  cart: Item[];

  @ApiProperty({
    description: "Избранные товары пользователя",
    type: () => [Item],
  })
  @Column({
    type: DataType.ARRAY(DataType.JSON),
    allowNull: true,
  })
  favorites: Item[];
}
