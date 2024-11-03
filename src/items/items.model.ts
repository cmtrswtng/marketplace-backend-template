import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model } from "sequelize-typescript";

interface ItemCreationAttr {
  phone: string;
  password: string;
}

@Table({ tableName: "items" })
export class Item extends Model<Item, ItemCreationAttr> {
  @ApiProperty({
    example: 1567,
    description: "ID товара",
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Товар",
    description: "Название товара",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  article: string;

  @ApiProperty({
    example: "Товар предназначен для местного использования",
    description: "Описание товара",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: 3000,
    description: "Цена",
  })
  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @ApiProperty({
    example: true,
    description: "Включена ли скидка",
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  isSaleEnabled: boolean;

  @ApiProperty({
    example: 2700,
    description: "Цена после скидки",
  })
  @Column({
    type: DataType.INTEGER,
  })
  salePrice: number;

  @ApiProperty({
    example: "static/photo.jpg",
    description: "Фото товара",
  })
  @Column({
    type: DataType.TEXT,
  })
  photos: string;

  @Column({
    type: DataType.INTEGER,
  })
  reviews: number;
}
