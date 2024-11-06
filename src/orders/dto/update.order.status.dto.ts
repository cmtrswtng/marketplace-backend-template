import { IsNumber } from "class-validator";
import { isNumberMessage } from "src/constants/messages";

export class UpdateOrderStatusDTO {
  @IsNumber({}, isNumberMessage)
  readonly orderId: number;
  @IsNumber({}, isNumberMessage)
  readonly statusId: number;
}
