import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { User } from "src/users/user.model";
import { Item } from "src/items/items.model";
import { Status } from "src/orders/statuses/status.model";
import { OrderItems } from "src/orders/order.items.model";

interface OrderCreationAttrs {
  userId: number;
  itemList: [number];
  orderTotal: number;
  deliveryAddress: string;
  deliveryType: string;
}

@Table({ tableName: "orders" })
export class Order extends Model<Order, OrderCreationAttrs> {
  @ApiProperty({ example: 1, description: "ID заказа" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  statusId: number;

  @BelongsTo(() => Status)
  status: Status;

  @ApiProperty({
    description: "Список товаров в заказе",
    type: () => [Item],
  })
  @BelongsToMany(() => Item, () => OrderItems)
  itemList: Item[];

  @ApiProperty({
    example: 5000,
    description: "Сумма заказа",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderTotal: number;

  @ApiProperty({
    example: "г. Москва, ул. Ленина, д. 1",
    description: "Адрес доставки",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  deliveryAddress: string;

  @ApiProperty({
    example: "N53EG4412SZ",
    description: "Тип доставки",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  deliveryType: string;

  @ApiProperty({
    example: "N53EG4412SZ",
    description: "Трек-номер доставки",
  })
  @Column({
    type: DataType.STRING,
  })
  trackNumber: string;
}
