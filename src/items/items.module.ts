import { Module } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { Item } from "./items.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "src/categories/categories.model";
import { ImagesModule } from "src/images/images.module";

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
  imports: [SequelizeModule.forFeature([Item, Category]), ImagesModule],
})
export class ItemsModule {}
