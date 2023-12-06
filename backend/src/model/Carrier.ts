export class Carrier {
	private _code: number;
	private _cnpj: string;
	private _name: string;
	private _email: string;
	private _phone: string;
	private _deliveryTime: number;
	private _address: string;

	constructor(
		code: number,
		cnpj: string,
		name: string,
		email: string,
		phone: string,
		deliveryTime: number,
		address: string,
	) {
		this._code = code;
		this._cnpj = cnpj;
		this._name = name;
		this._email = email;
		this._phone = phone;
		this._deliveryTime = deliveryTime;
		this._address = address;
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

	get cnpj(): string {
		return this._cnpj;
	}

	set cnpj(value: string) {
		this._cnpj = value;
	}

	get email(): string {
		return this._email;
	}

	set email(value: string) {
		this._email = value;
	}

	get phone(): string {
		return this._phone;
	}

	set phone(value: string) {
		this._phone = value;
	}

	get deliveryTime(): number {
		return this._deliveryTime;
	}

	set deliveryTime(value: number) {
		this._deliveryTime = value;
	}

	get address(): string {
		return this._address;
	}

	set address(value: string) {
		this._address = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}
}
