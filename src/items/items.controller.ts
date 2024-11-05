import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ItemsService } from "./items.service";
import { CreateItemDTO } from "./dto/create.item.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("items")
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("photos"))
  createItem(@Body() dto: CreateItemDTO, @UploadedFiles() photos) {
    return this.itemService.createItem(dto, photos);
  }

  @Get()
  getAllItems() {
    return this.itemService.getAllItems;
  }

  @Get()
  getItemByPK(@Query("id") id: number) {
    return this.itemService.getItemByPK(id);
  }
}
