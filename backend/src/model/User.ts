export class User {
  protected _code: number
  protected _name: string
  protected _cpf: string
  protected _rg: string
  protected _birth: Date
  protected _address: string
  protected _zipcode: string
  protected _email: string

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
    this._code = code
    this._name = name
    this._cpf = cpf
    this._rg = rg
    this._birth = birth
    this._address = address
    this._zipcode = zipcode
    this._email = email
  }

  get code() {
    return this.code
  }

  set code(value: number) {
    this._code = value
  }

  public toString(): string {
    return ''
  }
}
