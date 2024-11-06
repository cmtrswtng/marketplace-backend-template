import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { isNumberMessage, isStringMessage } from "src/constants/messages";

export class CreateItemDTO {
  @IsString(isStringMessage)
  readonly article: string;

  @IsString(isStringMessage)
  readonly description: string;

  @IsNumber({}, isNumberMessage)
  readonly price: number;

  @IsNumber({}, isNumberMessage)
  readonly categoryId: number;

  @IsNotEmpty({ message: "Не должно быть пустым" })
  readonly photos: [];
}
