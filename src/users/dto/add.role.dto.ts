import { IsNumber, IsString } from "class-validator";

export class AddRoleDTO {
  @IsString({ message: "Должно быть строкой" })
  readonly value: string;
  @IsNumber({}, { message: "Должно быть числом" })
  readonly userId: number;
}
