import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ItemsService } from "./items.service";
import { CreateItemDTO } from "./dto/create.item.dto";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("items")
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("photos"))
  createItem(@Body() dto: CreateItemDTO, @UploadedFiles() photos) {
    return this.itemService.createItem(dto, photos);
  }

  @Get()
  getAllItems() {
    return this.itemService.getAllItems();
  }

  @Get("/:id")
  getItemByPK(@Param("id") id: number) {
    return this.itemService.getItemByPK(id);
  }
}
