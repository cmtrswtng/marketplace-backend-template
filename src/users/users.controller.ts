import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.model";
import { Roles } from "src/auth/roles.decorator";
import { AddRoleDTO } from "./dto/add.role.dto";
import { CreateUserDTO } from "./dto/create.user.dto";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Создание пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Roles("ADMIN")
  @Post()
  create(@Body() userDTO: CreateUserDTO) {
    return this.usersService.createUser(userDTO);
  }

  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({
    summary: "Получение своего пользователя",
    description: "Необходимо передать токен авторизации",
  })
  @UseGuards(JwtAuthGuard)
  @Get("/me")
  getUser(@Request() req) {
    return this.usersService.getUser(req.user.id);
  }

  @ApiOperation({ summary: "Добавление ролей пользователям" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @Put()
  addRole(@Body() dto: AddRoleDTO) {
    return this.usersService.addRole(dto);
  }
}
