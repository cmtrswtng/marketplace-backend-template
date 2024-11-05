import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDTO } from "./dto/create.review.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@Controller("reviews")
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("photos"))
  postReview(@Body() dto: CreateReviewDTO, @UploadedFiles() photos: []) {
    return this.reviewService.postReview(dto, photos);
  }

  @Get("/item/:id")
  getItemReviews(@Param("id") id: number) {
    return this.reviewService.getItemReviews(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/user")
  getUserReviews(@Request() req) {
    return this.reviewService.getUserReviews(req.user.id);
  }
}
