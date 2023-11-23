import { Game } from "./Game";
import { type Developer } from "./Developer";
export class Adventure extends Game {
	_name: string;
	_description: string;
	_developer: Developer;
	_dateNew: Date;
	_valor: string;
	_exam: number;
	_requirimentMin: string;
	_comment: string;
	_avaliable: boolean;
	_code: string;
	private readonly priceGame: number = 80;
	private readonly taxRate: number = 5.5;

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
