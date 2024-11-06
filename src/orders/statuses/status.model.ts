import { Column, DataType, Table, Model } from "sequelize-typescript";

interface StatusCreationAttrs {
  article: string;
  description: string;
}

@Table({ tableName: "statuses" })
export class Status extends Model<Status, StatusCreationAttrs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  artice: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: number;
}
