import { type Carrier } from "./Carrier";
import { Client } from "./Client";
import { SaleItem } from "./SaleItem";
import { Manager } from "./Manager";
import { Payment } from "./Payment";
export class Sale {
	// n consigo arrumar a função pra valor total ,
	// calcularvalortotal
	// calcular data de entrega
	// public itemvenda additemvnda
	// type pay= "card" | "boleto" | "pix";

	protected _code: number;
	protected _client: Client;
	protected _manager: Manager;
	protected _dateSale: Date;
	protected _dateDelivery: Date;
	protected _saleItens: Array<SaleItem>;
	protected _hasPhysicalProduct: boolean;
	protected _totalPrice: number;
	protected _priceDiscount: number;
	protected _payment: Payment;
	protected _carrier: Carrier;

	constructor(
		code: number,
		client: Client,
		manager: Manager,
		dateSale: Date,
		dateDelivery: Date,
		hasPhysicalProduct: boolean,
		totalPrice: number,
		priceDiscount: number,
		payment: Payment,
		carrier: Carrier,
	) {
		this._code = code;
		this._client = client;
		this._manager = manager;
		this._dateSale = dateSale;
		this._dateDelivery = dateDelivery;
		this._carrier = carrier;
		this._payment = payment;
		this._hasPhysicalProduct = hasPhysicalProduct;
		this._priceDiscount = priceDiscount;
		this._totalPrice = totalPrice;
		this._saleItens = new Array<SaleItem>;
	}

	get code(): number {
		return this._code;
	}

	set code(value: number) {
		this._code = value;
	}

	get client(): Client {
		return this._client;
	}

	set client(value: Client) {
		this._client = value;
	}

	get manager(): Manager {
		return this._manager;
	}

	set manager(value: Manager) {
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
		return this._hasPhysicalProduct;
	}

	set physicalProduct(value: boolean) {
		this._hasPhysicalProduct = value;
	}

	get priceTotal(): number {
		return this._totalPrice;
	}

	set priceTotal(value: number) {
		this._totalPrice = value;
	}

	get priceDiscount(): number {
		return this._priceDiscount;
	}

	set priceDiscount(value: number) {
		this._priceDiscount = value;
	}

	get pay(): Payment {
		return this._payment;
	}

	set pay(value: Payment) {
		this._payment = value;
	}

	public calculateTotalPrice(): number {
		
	}
}
