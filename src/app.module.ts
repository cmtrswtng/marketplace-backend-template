import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/user.model";
import { ItemsModule } from "./items/items.module";
import { Item } from "./items/items.model";
import { ReviewsService } from "./reviews/reviews.service";
import { ReviewsController } from "./reviews/reviews.controller";
import { ReviewsModule } from "./reviews/reviews.module";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user.roles.model";
import { AuthModule } from "./auth/auth.module";
import { CategoriesModule } from "./categories/categories.module";
import { Category } from "./categories/categories.model";
import { Review } from "./reviews/reviews.model";
import { ImagesModule } from "./images/images.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { UserCart } from "./users/cart/user.cart.model";
import { UserFavourite } from "./users/favourite/user.favourite";
import { OrdersModule } from "./orders/orders.module";
import { StatusesModule } from "./orders/statuses/statuses.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      synchronize: process.env.NODE_ENV === "production",
      sync: { alter: true },
      models: [
        User,
        Role,
        UserRoles,
        Item,
        Category,
        Review,
        UserCart,
        UserFavourite,
      ],
    }),
    UsersModule,
    ItemsModule,
    ReviewsModule,
    RolesModule,
    AuthModule,
    CategoriesModule,
    ImagesModule,
    OrdersModule,
    StatusesModule,
  ],
})
export class AppModule {}
