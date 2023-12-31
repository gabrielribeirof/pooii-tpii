import { Payment } from "./Payment";

export class Pix extends Payment {
	private _pixCode: string;

	constructor(codeNote: string) {
		super(codeNote);
		this._pixCode = "";
	}

	get pixCode(): string {
		return this._pixCode;
	}

	set pixCode(value: string) {
		this._pixCode = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public generatePixCode(): void {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let pixCode = "";
		for (let i = 0; i < 10; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			pixCode += characters.charAt(randomIndex);
		}
		this._pixCode = pixCode;
	}
}
