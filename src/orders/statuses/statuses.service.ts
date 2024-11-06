import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Status } from "./status.model";
import { CreateStatusDTO } from "./dto/create.status.dto";
import { alreadyExistMessage } from "src/constants/messages";

@Injectable()
export class StatusesService {
  constructor(@InjectModel(Status) private statusRepository: typeof Status) {}

  async createStatus(dto: CreateStatusDTO) {
    const statusExist = await this.statusRepository.findOne({
      where: { artice: dto.article },
    });
    if (statusExist) {
      throw new BadRequestException(alreadyExistMessage("Статус", dto.article));
    }
    const status = await this.statusRepository.create(dto);
    return status;
  }

  async getStatuses() {
    return await this.statusRepository.findAll();
  }

  async getStatusByPK(id: number) {
    return await this.statusRepository.findByPk(id);
  }
}
