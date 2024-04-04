import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service"

describe("Order service unit tests", () => {
  it("Should get total of all orders", () => {
    const item1 = new OrderItem("id1", "name1", 100, "pid1", 4)
    const item2 = new OrderItem("id2", "name2", 200, "pid2", 1)
    const order1 = new Order("id1", "cid1", [item1])
    const order2 = new Order("id2", "cid2", [item2])
    const total = OrderService.total([order1, order2])
    expect(total).toBe(600);
  });

  it("SHould place an order", () => {
    const customer1 = new Customer("id1", "Customer 1")
    const item1 = new OrderItem("i1", "Item 1", 10, "pid1", 1)
    // const order = new Order("oid1", "cid1", [item1])
    const order = OrderService.placeOrder(customer1, [item1])
    expect(customer1.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  })
})