import { Module } from "@nestjs/common";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { Item } from "./items.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
  imports: [SequelizeModule.forFeature([Item])],
})
export class ItemsModule {}
