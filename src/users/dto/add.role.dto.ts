import { IsNumber, IsString } from "class-validator";
import { isNumberMessage, isStringMessage } from "src/constants/messages";

export class AddRoleDTO {
  @IsString(isStringMessage)
  readonly value: string;
  @IsNumber({}, isNumberMessage)
  readonly userId: number;
}
