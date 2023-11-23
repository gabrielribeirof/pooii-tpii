import { Game } from "./Game";
import { type Developer } from "./Developer";
export class Adventure extends Game {

	private readonly priceGame: number = 50;
	private readonly taxRate: number = 3.75;

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
		const taxRate: number = (this.taxRate / 100) * this.priceGame;
		const priceTotal: number = this.priceGame + taxRate;
		return priceTotal;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public static fromJSON(json: string): Game {
		return JSON.parse(json);
	}

	public toJSON(): string {
		return JSON.stringify(this);
	}
}
