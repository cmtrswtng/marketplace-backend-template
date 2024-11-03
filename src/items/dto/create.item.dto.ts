import { IsString } from "class-validator";
import { isStringMessage } from "src/constants/messages";

export class CreateItemDTO {
  @IsString(isStringMessage)
  article: string;
}
