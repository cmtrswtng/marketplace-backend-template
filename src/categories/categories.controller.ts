import { Body, Controller, Get, Injectable, Post } from "@nestjs/common";
import { CreateCategoryDTO } from "./dto/create.category.dto";
import { CategoriesService } from "./categories.service";
import { Roles } from "src/auth/roles.decorator";

@Controller("categories")
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Post()
  //   @Roles("ADMIN", "MODERATOR")
  async createCategory(@Body() dto: CreateCategoryDTO) {
    const category = await this.categoryService.createCategory(dto);
    return category;
  }

  @Get()
  async getAllCategories() {
    const categories = await this.categoryService.getAll();
    return categories;
  }
}
