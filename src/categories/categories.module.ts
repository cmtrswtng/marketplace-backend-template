import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Category } from "./categories.model";
import { Item } from "src/items/items.model";

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [SequelizeModule.forFeature([Category, Item])],
  exports: [CategoriesService],
})
export class CategoriesModule {}
