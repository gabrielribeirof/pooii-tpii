import { Iterator } from "../util/Iterator";

import { type Developer } from "./Developer";
import { EletronicGamesSystem } from "./EletronicGamesSystem";

export abstract class Game {
	protected _code: number;
	protected _name: string;
	protected _description: string;
	protected _developer: Developer;
	protected _dateNew: Date;
	protected _price: number;
	protected _note: number;
	protected _quantityReviews: number;
	protected _requirimentMin: string;
	protected _avaliable: boolean;

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
		this._code = code;
		this._name = name;
		this._description = description;
		this._developer = developer;
		this._dateNew = dateNew;
		this._price = price;
		this._note = this.calculateNote();
		this._quantityReviews = 0;
		this._requirimentMin = requirimentMin;
		this._avaliable = avaliable;
	}

	get code(): number {
		return this._code;
	}

	set code(value: number) {
		this._code = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get description(): string {
		return this._description;
	}

	set description(value: string) {
		this._description = value;
	}

	get developer(): Developer {
		return this._developer;
	}

	set developer(value: Developer) {
		this._developer = value;
	}

	get dateNew(): Date {
		return this._dateNew;
	}

	set dateNew(value: Date) {
		this._dateNew = value;
	}

	get price(): number {
		return this._price;
	}

	set price(value: number) {
		this._price = value;
	}

	get note(): number {
		return this._note;
	}

	set note(value: number) {
		this._note = value;
	}

	get quantityReviews(): number {
		return this._quantityReviews;
	}

	set quantityReviews(value: number) {
		this._quantityReviews = value;
	}

	get requirimentMin(): string {
		return this._requirimentMin;
	}

	set requirimentMin(value: string) {
		this._requirimentMin = value;
	}

	get avaliable(): boolean {
		return this._avaliable;
	}

	set avaliable(value: boolean) {
		this._avaliable = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public static fromJSON(json: string): Game {
		return JSON.parse(json);
	}

	public abstract calculateValue(): number;

	public calculateNote(): number {
		const it = new Iterator(EletronicGamesSystem.reviews);
		let note: number = 0;
		while (it.hasNext()) {
			if (it.current().game.code === this._code) note += it.next().note;
		}
		return note / this._quantityReviews;
	}
}
