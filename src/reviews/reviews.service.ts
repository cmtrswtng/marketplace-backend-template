import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Review } from "./reviews.model";
import { CreateReviewDTO } from "./dto/create.review.dto";
import { ImagesService } from "src/images/images.service";
import {
  alreadyExistMessage,
  doesNotExistMessage,
} from "src/constants/messages";
import { UsersService } from "src/users/users.service";
import { ItemsService } from "src/items/items.service";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review) private reviewRepository: typeof Review,
    private imageService: ImagesService,
    private userService: UsersService,
    private itemService: ItemsService
  ) {}

  async postReview(dto: CreateReviewDTO, photos?: []) {
    const user = await this.userService.getUserByPK(dto.userId);
    const item = await this.itemService.getItemByPK(dto.itemId);
    if (!user || !item) {
      throw new NotFoundException(
        doesNotExistMessage("Пользователь или товар")
      );
    }
    const reviewExist = await this.reviewRepository.findOne({
      where: {
        userId: dto.userId,
        itemId: dto.itemId,
      },
    });
    if (reviewExist) {
      throw new BadRequestException(alreadyExistMessage("Отзыв"));
    }
    const images = photos
      ? await this.imageService.createMultipleImages(photos)
      : null;
    const review = await this.reviewRepository.create({
      ...dto,
      photos: images || [],
    });
    return review;
  }

  async getItemReviews(id: number) {
    return await this.reviewRepository.findAll({ where: { itemId: id } });
  }

  async getUserReviews(id: number) {
    return await this.reviewRepository.findAll({ where: { userId: id } });
  }
}
