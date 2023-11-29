import { Iterator } from "../util/Iterator";

import { type Carrier } from "./Carrier";
import { type Client } from "./Client";
import { type SaleItem } from "./SaleItem";
import { type Manager } from "./Manager";
import { type Payment } from "./Payment";

export class Sale {
	private _code: number;
	private _client: Client;
	private _manager: Manager;
	private _dateSale: Date;
	private _dateDelivery: Date;
	private readonly _saleItens: SaleItem[];
	private _hasPhysicalProduct: boolean;
	private _totalPrice: number;
	private _priceDiscount: number;
	private _payment: Payment;
	private readonly _carrier: Carrier;

	constructor(
		code: number,
		client: Client,
		manager: Manager,
		dateSale: Date,
		hasPhysicalProduct: boolean,
		payment: Payment,
		carrier: Carrier,
	) {
		this._code = code;
		this._client = client;
		this._manager = manager;
		this._dateSale = dateSale;
		this._dateDelivery = dateSale;
		this.calculateDateDelivery();
		this._carrier = carrier;
		this._payment = payment;
		this._hasPhysicalProduct = hasPhysicalProduct;
		this._priceDiscount = 0;
		this._totalPrice = this.calculateTotalPrice();
		this._saleItens = new Array<SaleItem>();
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

	public toString(): string {
		return JSON.stringify(this);
	}

	public calculateTotalPrice(): number {
		const it = new Iterator(this._saleItens);
		let totalPrice = 0;
		while (it.hasNext()) {
			const item = it.next();
			totalPrice += item.price;
		}
		if (this._client.isEpic) {
			this.priceDiscount = totalPrice;
			return totalPrice - totalPrice * 0.05;
		} else {
			return totalPrice;
		}
	}

	public calculateDateDelivery(): void {
		if (this._hasPhysicalProduct) {
			let dia = this._dateSale.getDay();
			dia += this._carrier.timeCarrier;
			this._dateDelivery.setDate(dia);
		}
	}

	public addSaleItem(item: SaleItem): void {
		this._saleItens.push(item);
	}
}
