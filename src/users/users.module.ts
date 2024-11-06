import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { Role } from "../roles/roles.model";
import { UserRoles } from "src/roles/user.roles.model";
import { RolesModule } from "src/roles/roles.module";
import { AuthModule } from "src/auth/auth.module";
import { Review } from "src/reviews/reviews.model";
import { Item } from "src/items/items.model";
import { UserCart } from "./cart/user.cart.model";
import { CartService } from "./cart/cart.service";
import { FavouriteService } from "./favourite/favourite.service";
import { UserFavourite } from "./favourite/user.favourite";
import { OrdersModule } from "src/orders/orders.module";
import { Order } from "src/orders/orders.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService, CartService, FavouriteService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      UserRoles,
      Review,
      Item,
      UserCart,
      UserFavourite,
      Order
    ]),
    RolesModule,
    AuthModule,
    OrdersModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
