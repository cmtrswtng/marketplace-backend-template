import { Body, Controller, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDTO } from './dto/create.item.dto';

@Controller('items')
export class ItemsController {
    constructor(private itemService: ItemsService) {}

    @Post()
    createItem(@Body() dto: CreateItemDTO) {
        return this.itemService.createItem(dto);
    }
}
