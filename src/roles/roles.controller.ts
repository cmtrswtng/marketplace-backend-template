import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateRoleDTO } from "./dto/create.role.dto";

@ApiTags("Роли")
@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDTO) {
    return this.roleService.createRole(dto);
  }

  @Get()
  getByValue(@Query("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }
}