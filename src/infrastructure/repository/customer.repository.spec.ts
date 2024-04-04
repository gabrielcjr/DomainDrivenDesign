import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository unit tests", () => {
  let sequelize: Sequelize;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel])
    await sequelize.sync();      
  });
  
  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1234", "Customer 1234");
    const address = new Address("Rua1234", 1, "11111-111", "Amazonas")
    customer.changeAddress(address)
    await customerRepository.create(customer)
    const customerModel = await CustomerModel.findOne({ where: {id: "1234"}})

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1234",
      name: "Customer 1234",
      street: customer.address._street,
      number: customer.address._number,
      zipcode: customer.address._zip,
      city: customer.address._city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1234", "Customer 1234");
    const address = new Address("Rua1234", 1, "11111-111", "Amazonas")
    customer.changeAddress(address);
    await customerRepository.create(customer);

    customer.changeName("Clodoaldo");
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: {id: "1234"}});
    expect(customerModel.toJSON()).toStrictEqual({
      id: "1234",
      name: "Clodoaldo",
      street: customer.address._street,
      number: customer.address._number,
      zipcode: customer.address._zip,
      city: customer.address._city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });
  it("Should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1234", "Customer 1234");
    const address = new Address("Rua1234", 1, "11111-111", "Amazonas")
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id)

    expect(customer).toStrictEqual(customerResult)
  });

  it("Should throw an error when customer is not found", () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("456789")
    }).rejects.toThrow()
  })
  it("Should find all products", async () => {
    const customerRepository = new CustomerRepository();
    
    const customer1 = new Customer("x", "Customer x");
    const address1 = new Address("Ruax", 1, "11111-111", "Amazonas")
    customer1.changeAddress(address1);
    customer1.activate();
    await customerRepository.create(customer1);

    const customer2 = new Customer("z", "Customer z");
    const address2 = new Address("Ruaz", 1, "11111-111", "Amazonas")
    customer2.changeAddress(address2);
    customer2.activate();
    await customerRepository.create(customer2);
    
    const customers = await customerRepository.findAll();
    expect(customers).toHaveLength(2)
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  })
});