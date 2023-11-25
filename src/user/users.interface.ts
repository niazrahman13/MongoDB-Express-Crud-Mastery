
interface IName {
    firstName : string,
    lastName : string,
}

interface IAddress {
    street : string,
    city: string,
    country: string
}

interface IOrders {
    productName : string,
    price: number,
    quantity: number
}

interface IUsers {
    userId: number,
    username: string,
    password: any,
    fullName: IName;
    age: number,
    email: string,
    isActive : boolean,
    hobbies: string[],
    address : IAddress,
    orders: [IOrders]
  }

export {IUsers,IName, IOrders, IAddress }

