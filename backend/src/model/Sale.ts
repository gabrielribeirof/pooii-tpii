import { type Carrier } from "./Carrier";
export class Sale {
	// n consigo arrumar a função pra valor total ,
	// calcularvalortotal
	// calcular data de entrega
	// public itemvenda additemvnda
	// type pay= "card" | "boleto" | "pix";

	protected _code: string;
	protected _client: string;
	protected _manager: string;
	protected _dateSale: Date;
	protected _dateDelivery: Date;
	// PPRIVATE ITENSVENDA: ARRAYLIST//
	protected _physicalProduct: boolean;
	protected _priceTotal: number;
	protected _priceDiscount: number;
	protected _pay: pay;
	protected _Carrier: Carrier;

	constructor(
		code: string,
		client: string,
		manager: string,
		dateSale: Date,
		dateDelivery: Date,
		physicalProduct: boolean,
		priceTotal: number,
		priceDiscount: number,
		pay: pay,
		Carrier: Carrier,
	) {
		this._code = code;
		this._client = client;
		this._manager = manager;
		this._dateSale = dateSale;
		this._dateDelivery = dateDelivery;
		this._Carrier = Carrier;
		this._pay = pay;
		this._physicalProduct = physicalProduct;
		this._priceDiscount = priceDiscount;
		this._priceTotal = priceTotal;
	}

	get code(): number {
		return parseFloat(this._code);
	}

	set code(value: number) {
		this._code = value.toString();
	}

	get client(): string {
		return this._client;
	}

	set client(value: string) {
		this._client = value;
	}

	get manager(): string {
		return this._manager;
	}

	set manager(value: string) {
		this._manager = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public toJSON(): string {
		return JSON.stringify(this);
	}

	get dateDelivery(): Date {
		return this._dateDelivery;
	}

	set dateDelivery(value: Date) {
		this._dateDelivery = value;
	}

	get dateSale(): Date {
		return this._dateSale;
	}

	set dateSale(value: Date) {
		this._dateSale = value;
	}

	get physicalProduct(): boolean {
		return this._physicalProduct;
	}

	set physicalProduct(value: boolean) {
		this._physicalProduct = value;
	}

	get priceTotal(): number {
		return this._priceTotal;
	}

	set priceTotal(value: number) {
		this._priceTotal = value;
	}

	get priceDiscount(): number {
		return this._priceDiscount;
	}

	set priceDiscount(value: number) {
		this._priceDiscount = value;
	}

	get pay(): pay {
		return this._pay;
	}

	set pay(value: pay) {
		this._pay = value;
	}
}
