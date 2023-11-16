import { Payment } from "./Payment";

export class Card extends Payment {
	protected _flag: string;
	protected _nome: string;
	protected _number: number;

	constructor(_codeNote: string, flag: string, _nome: string, _number: number) {
		super(_codeNote);
		this._flag = flag;
		this._nome = _nome;
		this._number = _number;
	}

	protected get flag(): string {
		return this._flag;
	}

	protected set flag(value: string) {
		this._flag = value;
	}

	protected get nome(): string {
		return this._nome;
	}

	protected set nome(value: string) {
		this._nome = value;
	}

	protected get number(): string {
		return this.number;
	}

	protected set number(value: string) {
		this.number = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public toJSON(): string {
		return JSON.stringify(this);
	}
}
