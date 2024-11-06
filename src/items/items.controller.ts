import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ItemsService } from "./items.service";
import { CreateItemDTO } from "./dto/create.item.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UpdateItemDTO } from "./dto/update.item.dto";

@Controller("items")
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("photos"))
  createItem(@Body() dto: CreateItemDTO, @UploadedFiles() photos) {
    return this.itemService.createItem(dto, photos);
  }

  @Patch("/:id")
  @UseInterceptors(FilesInterceptor("photos"))
  updateItem(
    @Param("id") itemId,
    @Body() dto: UpdateItemDTO,
    @UploadedFiles() photos: []
  ) {
    return this.itemService.updateItem(itemId, dto, photos);
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
