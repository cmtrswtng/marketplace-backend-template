import { IsArray, IsNumber, IsString } from "class-validator";
import {
  IsArrayMessage,
  isNumberMessage,
  isStringMessage,
} from "src/constants/messages";

export class CreateItemDTO {
  @IsString(isStringMessage)
  readonly article: string;

  @IsString(isStringMessage)
  readonly description: string;

  @IsNumber({}, isNumberMessage)
  readonly price: number;

  @IsNumber({}, isNumberMessage)
  readonly categoryId: number;
}
