import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "src/users/dto/create.user.dto";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/login")
  login(@Body() userDTO: CreateUserDTO) {
    return this.authService.login(userDTO);
  }

  @Post("/registration")
  registration(@Body() userDTO: CreateUserDTO) {
    return this.authService.registration(userDTO);
  }
}
