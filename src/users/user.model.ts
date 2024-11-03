import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from "sequelize-typescript";
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

  @ApiProperty({ example: 178235, description: "ID корзины" })
  @Column({
    type: DataType.INTEGER,
    // references: "cartIds",
  })
  cartId: number;

  @ApiProperty({ example: 178235, description: "ID списка избранного" })
  @Column({
    type: DataType.INTEGER,
    // references: "favouriteListIds",
  })
  favouriteListId: number;

  @ApiProperty({
    example: 178235,
    description: "ID списка заказов",
  })
  @Column({
    type: DataType.INTEGER,
    // references: "orderListIds",
  })
  orderListId: number;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
