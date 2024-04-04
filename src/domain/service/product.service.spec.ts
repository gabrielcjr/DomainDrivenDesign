import Product from "../entity/product"
import ProductService from "./product.service"

describe("Product service unit tests", () => {
  it("Should change prices of all items", () => {
    const product1 = new Product("1", "Name 1", 100)
    const product2 = new Product("2", "Name 2", 50)
    const items = [product1, product2];

    ProductService.increasePrice(items, 100)

    expect(product1.price).toBe(200)
    expect(product2.price).toBe(100)
  })
})