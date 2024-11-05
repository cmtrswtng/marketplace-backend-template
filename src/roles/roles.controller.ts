import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateRoleDTO } from "./dto/create.role.dto";
import { Roles } from "src/auth/roles.decorator";

@ApiTags("Роли")
@Controller("roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Roles("ADMIN")
  @Post()
  create(@Body() dto: CreateRoleDTO) {
    return this.roleService.createRole(dto);
  }

  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }

  @Get()
  getAll() {
    return this.roleService.getAllRoles();
  }
}
