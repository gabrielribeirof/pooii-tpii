export class Payment {
	protected _codeNote: string;
	protected _receipt: Receipt | null;

	constructor(codeNote: string) {
		this._codeNote = codeNote;
		this._receipt = null; // Initialize receipt as null
	}

	get codeNote(): string {
		return this._codeNote;
	}

	set codeNote(value: string) {
		this._codeNote = value;
	}

	get receipt(): Receipt | null {
		return this._receipt;
	}

	public associateReceipt(receipt: Receipt): void {
		this._receipt = receipt;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public toJSON(): string {
		return JSON.stringify(this);
	}
}

export class Receipt {
	private _number: string;

	constructor(number: string, codeNote: string) {
		this._number = number;
		this.associateWithPayment(codeNote);
	}

	get number(): string {
		return this._number;
	}

	set number(value: string) {
		this._number = value;
	}

	private associateWithPayment(codeNote: string): void {
		const payment = getPaymentByCodeNote(codeNote);

		if (payment != null) {
			payment.associateReceipt(this);
		}
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public toJSON(): string {
		return JSON.stringify(this);
	}
}

function getPaymentByCodeNote(codeNote: string): Payment | null {
	return null;
}
