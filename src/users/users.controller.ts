import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.model";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { AddRoleDTO } from "./dto/add.role.dto";

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Создание пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDTO: CreateUserDTO) {
    return this.usersService.createUser(userDTO);
  }

  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN", "MANAGER")
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Добавление ролей пользователям" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Put()
  addRole(@Body() dto: AddRoleDTO) {
    return this.usersService.addRole(dto);
  }
}
