import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-respository.interface";

export default class OrderRepository implements OrderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    throw new Error("Method not implemented")
  }
  async update(entity: Order): Promise<void> {
    throw new Error("Method not implemented")
  }
  async find(id: string): Promise<Order> {
    throw new Error("Method not implemented")
  }
  async findAll(): Promise<Order[]> {
    throw new Error("Method not implemented")
    
  }
}