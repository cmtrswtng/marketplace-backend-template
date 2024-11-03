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
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      models: [User, Role, UserRoles, Item],
    }),
    UsersModule,
    ItemsModule,
    ReviewsModule,
    RolesModule,
    AuthModule,
    CategoryModule,
    CategoriesModule,
  ],
})
export class AppModule {}
