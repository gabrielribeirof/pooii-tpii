import { User } from "./User";

export class Manager extends User {
	protected _salary: number;
	protected _pis: string;
	protected _admissionDate: Date;

	constructor(
		code: number,
		name: string,
		cpf: string,
		rg: string,
		birth: Date,
		address: string,
		zipcode: string,
		email: string,
		salary: number,
		pis: string,
		admissionDate: Date,
	) {
		super(code, name, cpf, rg, birth, address, zipcode, email);
		this._salary = salary;
		this._pis = pis;
		this._admissionDate = admissionDate;
	}

	get salary(): number {
		return this._salary;
	}

	set salary(value: number) {
		this._salary = value;
	}

	get pis(): string {
		return this._pis;
	}

	set pis(value: string) {
		this._pis = value;
	}

	get admissionDate(): Date {
		return this._admissionDate;
	}

	set admissionDate(value: Date) {
		this._admissionDate = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}
}
