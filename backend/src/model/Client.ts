import { User } from "./User";

export class Client extends User {
	private _registerDate: Date;
	private _level: number;
	private _isEpic: boolean;

	constructor(
		code: number,
		name: string,
		cpf: string,
		rg: string,
		birth: Date,
		address: string,
		zipcode: string,
		email: string,
		registerDate: Date,
		isEpic: boolean,
	) {
		super(code, name, cpf, rg, birth, address, zipcode, email);
		this._registerDate = registerDate;
		this._level = 0;
		this._isEpic = isEpic;
	}

	get registerDate(): Date {
		return this._registerDate;
	}

	set registerDate(value: Date) {
		this._registerDate = value;
	}

	get level(): number {
		return this._level;
	}

	set level(value: number) {
		this._level = value;
	}

	get isEpic(): boolean {
		return this._isEpic;
	}

	set isEpic(value: boolean) {
		this._isEpic = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}
}
