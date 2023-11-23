import { Game } from "./Game";
import { type Developer } from "./Developer";
export class Running extends Game {
	_name: string;
	_description: string;
	_developer: Developer;
	_dateNew: Date;
	_price: string;
	_exam: number;
	_requirimentMin: string;
	_comment: string;
	_avaliable: boolean;
	_code: string;
	private readonly priceGame: number = 90;
	private readonly taxRate: number = 7.25;

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
		this._price = price;
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
