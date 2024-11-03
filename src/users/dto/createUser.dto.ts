import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @ApiProperty({ example: "9995556655", description: "Номер телефона" })
  readonly phone: string;
  @ApiProperty({ example: "password", description: "Пароль" })
  readonly password: string;
}
