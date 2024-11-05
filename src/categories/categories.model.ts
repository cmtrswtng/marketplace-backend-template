import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { Item } from "src/items/items.model";

interface CategoryCreationAttr {
  phone: string;
  password: string;
}

@Table({ tableName: "categories" })
export class Category extends Model<Category, CategoryCreationAttr> {
  @ApiProperty({
    example: 1161,
    description: "ID категории",
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "Верхняя одежда",
    description: "Название категории",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  article: string;

  @ApiProperty({
    example: "Одежда на осенний сезон",
    description: "Описание категории",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @HasMany(()=> Item)
  items: Item[];
}
