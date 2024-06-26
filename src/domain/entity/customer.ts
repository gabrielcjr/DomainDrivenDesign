import Address from "./address";

export default class Customer{
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string){
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get rewardPoints() : number {
    return this._rewardPoints;
  }

  isActive(): boolean {
    return this._active;
  }

  get address(): Address{
    return this._address
  }

  validate(){
    if (this._name.length ===0){
      throw new Error("Name is Required")
    }
    if(this._id.length === 0){
      throw new Error("ID is Required")
    }
  }

  changeName(name: string){
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address){
    this._address = address;
  }

  activate(){
    if(this._address === undefined){
      throw new Error("Address is mandatory to activate a customer")
    }
    this._active = true
  }

  deactivate(){
    this._active = false;
  }

  setAddress(address: Address){
    this._address = address;
  }
  
  addReward(reward: number){
    this._rewardPoints += reward;
  }
}