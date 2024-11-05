import { IsString } from "class-validator";
import { isStringMessage } from "src/constants/messages";

export class CreateCategoryDTO {
  @IsString(isStringMessage)
  readonly article: string;

  @IsString(isStringMessage)
  readonly description: string;
}
