export class ItemSale {
	protected _price: string;
	protected _quantity: string;
	protected _codeProduct: string;
	protected _isEpic: boolean;

	constructor(
		price: string,
		quantity: string,
		codeProduct: string,
		isEpic: boolean,
	) {
		this._price = price;
		this._quantity = quantity;
		this._codeProduct = codeProduct;
		this._isEpic = isEpic;
	}

	get price(): number {
		return parseFloat(this._price);
	}

	set price(value: number) {
		this._price = value.toString();
	}

	get quantity(): string {
		return this._quantity;
	}

	set quantity(value: string) {
		this._quantity = value;
	}

	get codeProduct(): string {
		return this._codeProduct;
	}

	set codeProduct(value: string) {
		this._codeProduct = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public toJSON(): string {
		return JSON.stringify(this);
	}

	get isEpic(): boolean {
		return this._isEpic;
	}

	set isEpic(value: boolean) {
		this._isEpic = value;
	}

	public calculateTotalPrice(): number {
		const purchaseValue: number = this.price * parseFloat(this.quantity);
		if (this.isEpic) {
			const discount: number = purchaseValue * 0.05;
			return purchaseValue - discount;
		} else {
			return purchaseValue;
		}
	}
}
