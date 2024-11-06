import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDTO } from "./dto/create.order.dto";
import { UpdateOrderStatusDTO } from "./dto/update.order.status.dto";

@Controller("orders")
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  createOrder(@Body() dto: CreateOrderDTO) {
    return this.orderService.createOrder(dto);
  }

  @Patch()
  updateOrderStatus(@Body() dto: UpdateOrderStatusDTO) {
    return this.orderService.updateOrderStatus(dto);
  }

  @Get("/status/:id")
  getOrderByStatus(@Param("id") statusId: number) {
    return this.orderService.getOrdersByStatus(statusId);
  }

  @Get("/:id")
  getOrderById(@Param("id") id: number) {
    return this.orderService.getOrderByPK(id);
  }
}
