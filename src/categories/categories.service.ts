import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./categories.model";
import { CreateCategoryDTO } from "./dto/create.category.dto";
import { alreadyExistMessage } from "src/constants/messages";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category
  ) {}

  async createCategory(dto: CreateCategoryDTO) {
    const categoryExist = await this.categoryRepository.findOne({
      where: { article: dto.article },
    });
    if (categoryExist) {
      throw new BadRequestException(
        alreadyExistMessage("Категория", dto.article)
      );
    }
    return await this.categoryRepository.create(dto);
  }

  async getAll() {
    return await this.categoryRepository.findAll();
  }

  async getByPK(id: number) {
    return await this.categoryRepository.findByPk(id);
  }
}
