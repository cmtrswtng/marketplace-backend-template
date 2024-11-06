import {
  Body,
  Controller,
  Delete,
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
import { CartService } from "./cart/cart.service";
import { FavouriteService } from "./favourite/favourite.service";
import { OrdersService } from "src/orders/orders.service";

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private usersCartService: CartService,
    private usersFavouriteService: FavouriteService,
    private orderService: OrdersService
  ) {}

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
  @ApiResponse({ status: 200, type: [User] })
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

  @ApiOperation({
    summary: "Сохранение товара в корзину",
    description: "Необходимо передать токен авторизации",
  })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Put("/cart/:item")
  addToCart(@Request() req, @Param("item") itemId: number) {
    return this.usersCartService.addItemToCart(req.user.id, itemId);
  }

  @ApiOperation({
    summary: "Сохранение товара в избранное",
    description: "Необходимо передать токен авторизации",
  })
  @UseGuards(JwtAuthGuard)
  @Post("/favourite/:item")
  addToFavourite(@Request() req, @Param("item") itemId: number) {
    return this.usersFavouriteService.addItemToFavourite(req.user.id, itemId);
  }

  @ApiOperation({
    summary: "Получение корзины пользователя",
    description: "Необходимо передать токен авторизации",
  })
  @UseGuards(JwtAuthGuard)
  @Get("/cart")
  getUserCart(@Request() req) {
    return this.usersCartService.getUserCart(req.user.id);
  }

  @ApiOperation({
    summary: "Получение избранного пользователя",
    description: "Необходимо передать токен авторизации",
  })
  @UseGuards(JwtAuthGuard)
  @Get("/favourite")
  getUserFavourites(@Request() req) {
    return this.usersFavouriteService.getUserFavourite(req.user.id);
  }

  @ApiOperation({
    summary: "Удаление товара из корзины",
    description: "Необходимо передать токен авторизации",
  })
  @UseGuards(JwtAuthGuard)
  @Delete("/cart/:item")
  removeFromCart(@Request() req, @Param("item") itemId: number) {
    return this.usersCartService.removeItemFromCart(req.user.id, itemId);
  }

  @ApiOperation({
    summary: "Удаление товара из избранного",
    description: "Необходимо передать токен авторизации",
  })
  @UseGuards(JwtAuthGuard)
  @Delete("/favourite/:item")
  removeFromFavourite(@Request() req, @Param("item") itemId: number) {
    return this.usersFavouriteService.removeItemFromFavourite(
      req.user.id,
      itemId
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("/orders")
  getUserOrders(@Request() req) {
    return this.orderService.getOrdersByUser(req.user.id);
  }
}
