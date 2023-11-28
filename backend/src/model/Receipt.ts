import { Payment } from "./Payment";

export class Receipt extends Payment {
	private _number: string;

	constructor(codeNote: string) {
		super(codeNote);
		this._number = this.generateRandomReceiptNumber();
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

	public generateRandomReceiptNumber(): string {
		const minNumber = 1000;
		const maxNumber = 9999;

		const randomNumber =
			Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

		return randomNumber.toString();
	}
}
