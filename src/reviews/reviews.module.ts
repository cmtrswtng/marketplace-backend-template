import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './reviews.model';
import { Item } from 'src/items/items.model';
import { User } from 'src/users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Review, Item, User])],
})
export class ReviewsModule {}
