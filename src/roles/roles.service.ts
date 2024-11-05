import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./roles.model";
import { CreateRoleDTO } from "./dto/create.role.dto";
import {
  alreadyExistMessage,
} from "src/constants/messages";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async createRole(dto: CreateRoleDTO) {
    const roleExist = await this.roleRepository.findOne({
      where: { value: dto.value },
    });

    if (roleExist) {
      throw new BadRequestException(alreadyExistMessage("Роль", dto.value));
    }

    return await this.roleRepository.create(dto);
  }

  async getAllRoles() {
    return await this.roleRepository.findAll();
  }

  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({ where: { value } });
  }
}
