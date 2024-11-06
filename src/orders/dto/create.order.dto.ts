import { IsArray, IsNumber, IsString } from "class-validator";
import {
  IsArrayMessage,
  isNumberMessage,
  isStringMessage,
} from "src/constants/messages";

export class CreateOrderDTO {
  @IsNumber({}, isNumberMessage)
  readonly userId: number;
  @IsArray(IsArrayMessage)
  readonly itemList: [number];
  @IsNumber({}, isNumberMessage)
  readonly orderTotal: number;
  @IsString(isStringMessage)
  readonly deliveryAddress: string;
  @IsString(isStringMessage)
  readonly deliveryType: string;
}
