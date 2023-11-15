import { Payment } from "./Payment";

export class Receipt extends Payment {
	private _number: string;

	constructor(_codeNote: string) {
		super(_codeNote);
		this._number = generateRandomReceiptNumber();
	}

	protected get number(): string {
		return this._number;
	}

	protected set number(value: string) {
		this._number = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public toJSON(): string {
		return JSON.stringify(this);
	}
}

function generateRandomReceiptNumber(): string {
	const minNumber = 1000;
	const maxNumber = 9999;

	const randomNumber =
		Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

	return randomNumber.toString();
}
