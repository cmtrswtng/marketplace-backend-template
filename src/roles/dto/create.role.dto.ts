import { IsString } from "class-validator";
import { isStringMessage } from "src/constants/messages";

export class CreateRoleDTO {
  @IsString(isStringMessage)
  readonly value: string;
  @IsString(isStringMessage)
  readonly description: string;
}
