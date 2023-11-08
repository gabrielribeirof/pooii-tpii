import { User } from "./User";

export class Client extends User {
  constructor(
    code: number,
    name: string,
    cpf: string,
    rg: string,
    birth: Date,
    address: string,
    zipcode: string,
    email: string
  ) {
    super()
  }
}