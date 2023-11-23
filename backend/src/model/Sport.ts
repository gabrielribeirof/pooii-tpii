import { Game } from "./Game";
import { type Developer } from "./Developer";
export class Sport extends Game {

	private readonly valorJogo: number = 40;
	private readonly taxaImposto: number = 0.75;

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
		const valorImposto: number = (this.taxaImposto / 100) * this.valorJogo;
		const valorTotal: number = this.valorJogo + valorImposto;
		return valorTotal;
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
