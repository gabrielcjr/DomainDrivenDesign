import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("Shoult throw error when id is empty", () => {
    expect(() => {
      let order = new Order("","123", [])
    }).toThrow()
  });
  it("Shoult throw error when customer_id is empty", () => {
    expect(() => {
      let order = new Order("123", "", [])
    }).toThrow()
  });
  it("Shoult throw error when array of items is empty", () => {
    expect(() => {
      let order = new Order("123", "123", [])
    }).toThrow()
  });

  it("Should calculate total", () => {
    const item1 = new OrderItem("1", "name1", 17, "p1", 2);
    const item2 = new OrderItem("2", "name2", 3, "p2", 1);
    const order1 = new Order("order1", "customer1", [item1, item2])

    let total = order1.total();
    expect(total).toBe(37);
    const order2 = new Order("order2", "customer2", [item1])
    total = order2.total();
    expect(total).toBe(34)
  });
  it("Shouldthrow error if the item qty is less or equal to 0", () => {
    
    expect(() => {
      const item1 = new OrderItem("1", "name1", 17, "p1", 0);
      const order1 = new Order("order1", "customer1", [item1])
    }).toThrow();
  });
});