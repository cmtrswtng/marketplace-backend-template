import { forwardRef, Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "src/users/users.module";
import { ItemsModule } from "src/items/items.module";
import { Order } from "./orders.model";
import { OrderItems } from "./order.items.model";
import { StatusesModule } from "./statuses/statuses.module";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([Order, OrderItems]),
    forwardRef(() => UsersModule),
    ItemsModule,
    StatusesModule,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
