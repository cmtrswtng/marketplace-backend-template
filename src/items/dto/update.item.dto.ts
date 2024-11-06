import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
} from "class-validator";
import {
  IsArrayMessage,
  IsBooleanMessage,
  isNumberMessage,
  isStringMessage,
} from "src/constants/messages";

export class UpdateItemDTO {
  @ApiProperty({
    example: "Название товара",
    description: "Название товара",
    required: false,
  })
  @IsOptional()
  @IsString(isStringMessage)
  article?: string;

  @ApiProperty({
    example: "Описание товара",
    description: "Описание товара",
    required: false,
  })
  @IsOptional()
  @IsString(isStringMessage)
  description?: string;

  @ApiProperty({ example: 1000, description: "Цена товара", required: false })
  @IsOptional()
  @IsNumber({}, isNumberMessage)
  price?: number;

  @ApiProperty({
    example: 800,
    description: "Цена со скидкой",
    required: false,
  })
  @IsOptional()
  @IsNumber({}, isNumberMessage)
  salePrice?: number;

  @ApiProperty({
    example: 2,
    description: "ID категории товара",
    required: false,
  })
  @IsOptional()
  @IsNumber({}, isNumberMessage)
  categoryId?: number;

  @ApiProperty({
    example: false,
    description: "Наличие товара на складе",
    required: false,
  })
  @IsOptional()
  @IsBoolean(IsBooleanMessage)
  outOfStock?: boolean;

  @ApiProperty({
    example: false,
    description: "Скрыть товар от пользователя",
    required: false,
  })
  @IsOptional()
  @IsBoolean(IsBooleanMessage)
  hideFromUser?: boolean;
}
