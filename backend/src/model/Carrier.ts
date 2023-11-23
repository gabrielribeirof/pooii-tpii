export class Carrier {
	protected _code: number;
	protected _cnpj: string;
	protected _name: string;
	protected _email: string;
	protected _phone: string;
	protected _timeCarrier: number;
	protected _adress: string;

	constructor(
		code: number,
		cnpj: string,
		name: string,
		email: string,
		phone: string,
		timeCarrier: number,
		adress: string,
	) {
		this._code = code;
		this._cnpj = cnpj;
		this._name = name;
		this._email = email;
		this._phone = phone;
		this._timeCarrier = timeCarrier;
		this._adress = adress;
	}

	get code(): number {
		return this.code;
	}

	set code(value: number) {
		this.code = value;
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

	get timeCarrier(): number {
		return this._timeCarrier;
	}

	set timeCarrier(value: number) {
		this._timeCarrier = value;
	}

	get adress(): string {
		return this._adress;
	}

	set adress(value: string) {
		this.adress = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public toJSON(): string {
		return JSON.stringify(this);
	}
}
