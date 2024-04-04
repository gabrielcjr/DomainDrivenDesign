import Product from "./product";

describe("Product unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 16)
    }).toThrow()
  });
  it("Should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 16)
    }).toThrow()
  });
  it("Should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Ah", -1)
    }).toThrow()
  });
  it("Should change name", () => {
    const product = new Product("123", "Name", 10)
    product.changeName("Name alterado")
    expect(product.name).toBe("Name alterado")
  });
  it("Should change price", () => {
    const product = new Product("123", "Name", 10)
    product.changePrice(150)
    expect(product.price).toBe(150)
  });
});