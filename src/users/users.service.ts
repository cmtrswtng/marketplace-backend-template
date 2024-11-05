import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDTO } from "./dto/add.role.dto";
import { CreateUserDTO } from "./dto/create.user.dto";
import {
  alreadyExistMessage,
  doesNotExistMessage,
} from "src/constants/messages";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDTO) {
    const userExist = await this.userRepository.findOne({
      where: { phone: dto.phone },
    });
    if (userExist) {
      throw new BadRequestException(alreadyExistMessage("Пользователь"));
    }

    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("USER");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUser(id: number) {
    return await this.userRepository.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  }

  async getUserByPhone(phone: string) {
    return await this.userRepository.findOne({
      where: { phone },
      include: { all: true },
    });
  }

  async getUserByPK(id: number) {
    return await this.userRepository.findByPk(id);
  }

  async addRole(dto: AddRoleDTO) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new NotFoundException(doesNotExistMessage("Пользователя или роли"));
  }
}
