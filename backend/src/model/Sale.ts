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
	private readonly _saleItems: SaleItem[];
	private _hasPhysicalProduct: boolean;
	private readonly _totalPrice: number;
	private readonly _priceDiscount: number;
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
		this._totalPrice = this.calculateTotalPrice();
		this._priceDiscount = this.calculatePriceDiscount();
		this._saleItems = new Array<SaleItem>();
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

	get totalPrice(): number {
		return this.calculateTotalPrice();
	}

	get priceDiscount(): number {
		return this.calculatePriceDiscount();
	}

	get payment(): Payment {
		return this._payment;
	}

	set payment(value: Payment) {
		this._payment = value;
	}

	get saleItems(): SaleItem[] {
		return this._saleItems;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public calculateTotalPrice(): number {
		const it = new Iterator(this._saleItems);
		let totalPrice = 0;
		while (it.hasNext()) {
			const item = it.next();
			totalPrice += item.price;
		}
		return totalPrice;
	}

	public calculatePriceDiscount(): number {
		if (this._client.isEpic) return this.totalPrice - this.totalPrice * 0.05;
		else return this.totalPrice;
	}

	public calculateDateDelivery(): void {
		if (this._hasPhysicalProduct) {
			let dia = this._dateSale.getDay();
			dia += this._carrier.timeCarrier;
			this._dateDelivery.setDate(dia);
		}
	}

	public addSaleItem(item: SaleItem): void {
		this._saleItems.push(item);
	}
}
