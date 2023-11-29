import { Payment } from "./Payment";

export class Card extends Payment {
	private _flag: string;
	private _name: string;
	private _number: string;

	constructor(codeNote: string, flag: string, name: string, number: string) {
		super(codeNote);
		this._flag = flag;
		this._name = name;
		this._number = number;
	}

	get flag(): string {
		return this._flag;
	}

	set flag(value: string) {
		this._flag = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get number(): string {
		return this._number;
	}

	set number(value: string) {
		this._number = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}
}
