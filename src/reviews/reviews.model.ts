import { Column, DataType, Table, Model } from "sequelize-typescript";

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

  @Column({
    type: DataType.INTEGER,
    // references: "cartIds",
  })
  itemId: number;

  @Column({
    type: DataType.INTEGER,
    // references: "favouriteListIds",
  })
  favouriteListId: number;

  @Column({
    type: DataType.TEXT,
    // references: "orderListIds",
  })
  photos: string;
}
