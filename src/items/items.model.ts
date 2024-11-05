import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Category } from "src/categories/categories.model";

interface ItemCreationAttrs {
  article: string;
  description: string;
  price: number;
  salePrice?: number;
  categoryId: number;
  photos: string[];
}

@Table({ tableName: "items" })
export class Item extends Model<Item, ItemCreationAttrs> {
  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор товара",
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Название товара",
    description: "Название товара",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  article: string;

  @ApiProperty({
    example: "Описание товара",
    description: "Описание товара",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: 1000,
    description: "Цена товара",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    example: 800,
    description: "Цена со скидкой (если имеется)",
    nullable: true,
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  salePrice: number;

  @ApiProperty({
    example: ["photo1.jpg", "photo2.jpg"],
    description: "Список путей к фотографиям товара",
    type: [String],
  })
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  photos: string[];

  @ForeignKey(() => Category)
  @ApiProperty({
    example: 2,
    description: "ID категории товара",
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
