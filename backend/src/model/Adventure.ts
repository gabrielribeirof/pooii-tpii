import { Game } from "./Game";
import { type Developer } from "./Developer";
export class Adventure extends Game {
	private readonly taxRate: number = 0.055;

	constructor(
		code: number,
		name: string,
		description: string,
		developer: Developer,
		dateNew: Date,
		price: number,
		exam: number,
		requirimentMin: string,
		comment: string,
		avaliable: boolean,
	) {
		super(
			code,
			name,
			description,
			developer,
			dateNew,
			price,
			exam,
			requirimentMin,
			comment,
			avaliable,
		);
	}

	public calculateValue(): number {
		return this.price + (this.price * this.taxRate);
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public static fromJSON(json: string): Game {
		return JSON.parse(json);
	}
}
