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

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Review, Item]),
    RolesModule,
    AuthModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
