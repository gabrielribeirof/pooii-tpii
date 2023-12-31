import { EletronicGamesSystem } from "./EletronicGamesSystem";

export class SaleItem {
	private _price: number;
	private _quantity: number;
	private _codeProduct: number;

	constructor(quantity: number, codeProduct: number) {
		this._quantity = quantity;
		this._codeProduct = codeProduct;
		this._price = this.calculateTotalPrice();
	}

	get price(): number {
		return this._price;
	}

	set price(value: number) {
		this._price = value;
	}

	get quantity(): number {
		return this._quantity;
	}

	set quantity(value: number) {
		this._quantity = value;
	}

	get codeProduct(): number {
		return this._codeProduct;
	}

	set codeProduct(value: number) {
		this._codeProduct = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public calculateTotalPrice(): number {
		const game = EletronicGamesSystem.games.find(
			(game) => game.code === this._codeProduct,
		);

		if (game) {
			return this._quantity * game.price;
		}

		return 0;
	}
}
