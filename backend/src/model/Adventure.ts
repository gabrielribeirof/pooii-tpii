import { type Developer } from "./Developer";
import { Game } from "./Game";

export class Adventure extends Game {
	private readonly taxRate: number = 0.055;

	constructor(
		code: number,
		name: string,
		description: string,
		developer: Developer,
		dateNew: Date,
		price: number,
		requirimentMin: string,
		avaliable: boolean,
	) {
		super(
			code,
			name,
			description,
			developer,
			dateNew,
			price,
			requirimentMin,
			avaliable,
		);
	}

	public calculateValue(): number {
		return this.price + this.price * this.taxRate;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public static fromJSON(json: string): Game {
		return JSON.parse(json);
	}

	public readonly isAdventure: boolean = true;
}
