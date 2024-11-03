import { IsString } from "class-validator";

export class CreateRoleDTO {
  @IsString({ message: "Должно быть строкой" })
  readonly value: string;
  @IsString({ message: "Должно быть строкой" })
  readonly description: string;
}
