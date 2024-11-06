import { IsString } from "class-validator";
import { isStringMessage } from "src/constants/messages";

export class CreateStatusDTO {
  @IsString(isStringMessage)
  readonly article: string;
  @IsString(isStringMessage)
  readonly description: string;
}
