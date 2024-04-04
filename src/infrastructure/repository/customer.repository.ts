import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-respository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface{
  async create(entity: Customer): Promise<void>{
    // throw new Error("Method not implemented")
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipcode,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }
  async update(entity: Customer): Promise<void>{
    // throw new Error("Method not implemented")
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zipcode,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id
        }
      }
    )
  }
  async find(id: string): Promise<Customer>{
    // throw new Error("Method not implemented")
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id
        },
        rejectOnEmpty: true,
      });
    } catch (error){
      throw new Error("Customer not found")
    }

    const customer = new Customer(id, customerModel.name)
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );
    customer.changeAddress(address);
    return customer;
  }
  async findAll(): Promise<Customer[]>{
    // throw new Error("Method not implemented")
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerItem) => {
      let customer = new Customer(customerItem.id, customerItem.name)
      customer.addReward(customer.rewardPoints);
      const address = new Address(
        customerItem.street,
        customerItem.number,
        customerItem.zipcode,
        customerItem.city
      );
      customer.changeAddress(address);
      if(customerItem.active){
        customer.activate()
      }
      return customer;
    });
    return customers;
  }
}