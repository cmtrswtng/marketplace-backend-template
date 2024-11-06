import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from "sequelize-typescript";
import { Order } from "src/orders/orders.model";
import { Item } from "src/items/items.model";

@Table({ tableName: "order_items" })
export class OrderItems extends Model<OrderItems> {
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;

  @ForeignKey(() => Item)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  itemId: number;
}
