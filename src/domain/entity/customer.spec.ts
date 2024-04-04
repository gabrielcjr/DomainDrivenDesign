import Address from "./address";
import Customer from "./customer"

describe("Customer unit tests", () => {
  it("Shoult throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrow()
  });
  it("Shoult throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrow()
  });
  it("Should change name", () => {
    // ARRANGE
    const customer = new Customer("123", "John")

    // ACT
    customer.changeName("Jane");

    // ASSERT
    expect(customer.name).toBe("Jane")
  });
  it("Should activate customer", () => {
    const customer = new Customer("123","John")
    const address = new Address("Rua 1", 361, "123456-789", "Amazonas")
    customer.setAddress(address);
    customer.activate();

    expect(customer.isActive()).toBe(true)
  });
  it("Should activate customer", () => {
    const customer = new Customer("123", "John")
    customer.deactivate();
    expect(customer.isActive()).toBe(false)
  });
  it("Should throw error when trying to activate user without address", () => {
    expect(() => {
      const customer = new Customer("123","John")
      customer.activate()
    }).toThrow()
  })
  it("Should add reward points", () => {
    const customer = new Customer("cid1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addReward(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addReward(10);
    expect(customer.rewardPoints).toBe(20);
  })
});