import { Payment } from "./Payment";

export class Pix extends Payment {
	protected _codPix: string;

	constructor(_codeNote: string, codPix: string) {
		super(_codeNote);
		this._codPix = codPix;
	}

	get codPix(): string {
		return this._codPix;
	}

	set codPix(value: string) {
		this._codPix = value;
	}

	public generatePixCode(): string {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let pixCode = "";
		for (let i = 0; i < 10; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			pixCode += characters.charAt(randomIndex);
		}
		return pixCode;
	}
}
