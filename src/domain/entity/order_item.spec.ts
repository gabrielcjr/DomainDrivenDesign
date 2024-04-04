import OrderItem from "./order_item";

describe("Order item unit tests", () => {
  it("Shoult throw error if qty is less or equal to zero", () => {
    expect(() => {
      let orderItem = new OrderItem("123", "p1", 10, "pI1", 0);
    }).toThrow()
  });
  
});