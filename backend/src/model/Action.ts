import { Game } from "./Game";
import { type Developer } from "./Developer";
export class Action extends Game {
	_valor: string;

	private readonly priceGame: number = 50;
	private readonly taxRate: number = 2.25;

	constructor(
		code: string,
		name: string,
		description: string,
		developer: Developer,
		dateNew: Date,
		valor: string,
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
			valor,
			exam,
			requirimentMin,
			comment,
			avaliable,
		);
		this._code = code;
		this._name = name;
		this._description = description;
		this._developer = developer;
		this._dateNew = dateNew;
		this._valor = valor;
		this._exam = exam;
		this._requirimentMin = requirimentMin;
		this._comment = comment;
		this._avaliable = avaliable;
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
