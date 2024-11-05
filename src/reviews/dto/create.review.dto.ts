import { IsNumber, IsString } from "class-validator";
import { isNumberMessage, isStringMessage } from "src/constants/messages";

export class CreateReviewDTO {
  @IsString(isStringMessage)
  readonly description: string;
  readonly photos?: [];
  @IsNumber({}, isNumberMessage)
  readonly rating: number;
  @IsNumber({}, isNumberMessage)
  readonly userId: number;
  @IsNumber({}, isNumberMessage)
  readonly itemId: number;
}
