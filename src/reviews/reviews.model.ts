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
  phone: string;
  password: string;
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
    example: ["static/photo1.jpg", "static/photo2.jpg"],
    description: "Фотографии отызва",
    type: [String],
  })
  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: true,
  })
  photos: string[];
}
