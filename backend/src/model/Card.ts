import { Payment } from "./Payment";

export class Card extends Payment {
	private _flag: string;
	private _name: string;
	private _number: number;

	constructor(codeNote: string, 
		flag: string, 
		name: string, 
		number: number) {
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

	get nome(): string {
		return this._name;
	}

	set nome(value: string) {
		this._name = value;
	}

	get number(): string {
		return this.number;
	}

	set number(value: string) {
		this.number = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}
}
