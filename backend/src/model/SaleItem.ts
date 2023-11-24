export class SaleItem{
	protected _price: number;
	protected _quantity: number;
	protected _codeProduct: number;

	constructor(
		price: number,
		quantity: number,
		codeProduct: number,
	) {
		this._price = price;
		this._quantity = quantity;
		this._codeProduct = codeProduct;
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

	public toJSON(): string {
		return JSON.stringify(this);
	}

	public calculateTotalPrice(): number {
		return this._quantity * this._price;
	}
}
