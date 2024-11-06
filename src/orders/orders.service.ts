import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "src/orders/orders.model";
import { OrderItems } from "src/orders/order.items.model";
import { CreateOrderDTO } from "src/orders/dto/create.order.dto";
import { doesNotExistMessage } from "src/constants/messages";
import { StatusesService } from "./statuses/statuses.service";
import { UpdateOrderStatusDTO } from "./dto/update.order.status.dto";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    @InjectModel(OrderItems) private orderItemsRepository: typeof OrderItems,
    private statusService: StatusesService
  ) {}

  async createOrder(dto: CreateOrderDTO): Promise<Order> {
    const order = await this.orderRepository.create(dto);

    for (const itemId of dto.itemList) {
      await this.orderItemsRepository.create({ orderId: order.id, itemId });
    }

    return order;
  }

  async updateOrderStatus(dto: UpdateOrderStatusDTO): Promise<Order> {
    const order = await this.orderRepository.findByPk(dto.orderId);
    if (!order) {
      throw new NotFoundException(doesNotExistMessage("Заказ"));
    }

    const status = await this.statusService.getStatusByPK(dto.statusId);

    if (!status) {
      throw new NotFoundException(doesNotExistMessage("Статус"));
    }

    order.statusId = dto.statusId;
    await order.save();

    return order;
  }

  async addTrackingNumber(
    orderId: number,
    trackNumber: string
  ): Promise<Order> {
    const order = await this.orderRepository.findByPk(orderId);
    if (!order) {
      throw new NotFoundException(`Заказ с ID ${orderId} не найден`);
    }

    order.trackNumber = trackNumber;
    await order.save();

    return order;
  }

  async getOrderByPK(id: number) {
    return await this.orderRepository.findByPk(id);
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return await this.orderRepository.findAll({
      where: { userId },
      include: { all: true },
    });
  }

  async getOrdersByStatus(statusId: number): Promise<Order[]> {
    return await this.orderRepository.findAll({
      where: { statusId },
      include: { all: true },
    });
  }
}
