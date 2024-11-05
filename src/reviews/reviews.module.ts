import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Review } from "./reviews.model";
import { Item } from "src/items/items.model";
import { User } from "src/users/user.model";
import { ImagesModule } from "src/images/images.module";
import { UsersModule } from "src/users/users.module";
import { ItemsModule } from "src/items/items.module";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [ReviewsService],
  controllers: [ReviewsController],
  imports: [
    SequelizeModule.forFeature([Review, Item, User]),
    ImagesModule,
    UsersModule,
    ItemsModule,
    JwtModule,
  ],
})
export class ReviewsModule {}
