import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { Category } from "src/categories/categories.model";
import { Review } from "src/reviews/reviews.model";

interface ItemCreationAttrs {
  article: string;

  description: string;

  price: number;

  photos: string[];

  categoryId: number;
}

@Table({ tableName: "items" })
export class Item extends Model<Item, ItemCreationAttrs> {
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
    example: ["static/photo1.jpg", "static/photo2.jpg"],
    description: "Фотографии товара",
    type: [String],
  })
  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: true,
  })
  photos: string[];

  @HasMany(() => Review)
  reviews: Review[];

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryID: number;

  @BelongsTo(() => Category)
  category: Category;
}
