import { Column, DataType, Table, Model } from "sequelize-typescript";

interface ItemCreationAttr {
  phone: string;
  password: string;
}

@Table({ tableName: "items" })
export class Item extends Model<Item, ItemCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  article: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  isSaleEnabled: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  salePrice: number;

  @Column({
    type: DataType.TEXT,
  })
  photos: string;

  @Column({
    type: DataType.INTEGER,
  })
  reviews: number;
}
