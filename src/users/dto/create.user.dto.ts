import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { isStringMessage, maxMinLength } from "src/constants/messages";

export class CreateUserDTO {
  @ApiProperty({ example: "9995556655", description: "Номер телефона" })
  @IsString(isStringMessage)
  @Length(10, 10, maxMinLength(10, 10))
  readonly phone: string;
  
  @ApiProperty({ example: "password", description: "Пароль" })
  @IsString(isStringMessage)
  @Length(8, 120, maxMinLength(8, 120))
  readonly password: string;
}
