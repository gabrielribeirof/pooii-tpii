export class User {
	protected _code: number;
	protected _name: string;
	protected _cpf: string;
	protected _rg: string;
	protected _birth: Date;
	protected _address: string;
	protected _zipcode: string;
	protected _email: string;

	constructor(
		code: number,
		name: string,
		cpf: string,
		rg: string,
		birth: Date,
		address: string,
		zipcode: string,
		email: string,
	) {
		this._code = code;
		this._name = name;
		this._cpf = cpf;
		this._rg = rg;
		this._birth = birth;
		this._address = address;
		this._zipcode = zipcode;
		this._email = email;
	}

	get code(): number {
		return this._code;
	}

	set code(value: number) {
		this._code = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get cpf(): string {
		return this._cpf;
	}

	set cpf(value: string) {
		this._cpf = value;
	}

	get rg(): string {
		return this._rg;
	}

	set rg(value: string) {
		this._rg = value;
	}

	get birth(): Date {
		return this._birth;
	}

	set birth(value: Date) {
		this._birth = value;
	}

	get address(): string {
		return this._address;
	}

	set address(value: string) {
		this._address = value;
	}

	get zipcode(): string {
		return this._zipcode;
	}

	set zipcode(value: string) {
		this._zipcode = value;
	}

	get email(): string {
		return this._email;
	}

	set email(value: string) {
		this._email = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}
}
