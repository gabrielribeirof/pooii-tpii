import { Game } from "./Game";
import { type Developer } from "./Developer";
export class Action extends Game {
	_code: string;
	_name: string;
	_description: string;
	_developer: Developer;
	_dateNew: Date;
	_price: string;
	_exam: number;
	_requirimentMin: string;
	_comment: string;
	_avaliable: boolean;

	private readonly priceGame: number = 50;
	private readonly taxRate: number = 2.25;

	constructor(
		code: string,
		name: string,
		description: string,
		developer: Developer,
		dateNew: Date,
		price: string,
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
		this._code = code;
		this._name = name;
		this._description = description;
		this._developer = developer;
		this._dateNew = dateNew;
		this._price = valor;
		this._exam = exam;
		this._requirimentMin = requirimentMin;
		this._comment = comment;
		this._avaliable = avaliable;
	}

	public calculateValue(): number {
		const valorImposto: number = (this.taxRate / 100) * this.taxRate;
		const valorTotal: number = this.priceGame + valorImposto;
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
