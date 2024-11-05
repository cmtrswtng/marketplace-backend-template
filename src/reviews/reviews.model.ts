import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Item } from "src/items/items.model";
import { User } from "src/users/user.model";

interface ReviewCreationAttr {
  description: string;
  photos: string[];
  rating: number;
  userId: number;
  itemId: number;
}

@Table({ tableName: "reviews" })
export class Review extends Model<Review, ReviewCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  rating: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ForeignKey(() => Item)
  @Column({
    type: DataType.INTEGER,
  })
  itemId: number;

  @BelongsTo(() => Item)
  item: Item;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

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
}
