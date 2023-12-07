import { type Request, type Response } from "express";

import { Sale } from "../model/Sale";
import { EletronicGamesSystem } from "../model/EletronicGamesSystem";
import { SaleItem } from "../model/SaleItem";
import { Pix } from "../model/Pix";
import { type Payment } from "../model/Payment";
import { Card } from "../model/Card";
import { Receipt } from "../model/Receipt";
import { Iterator } from "../util/Iterator";

class SaleController {
	public addSale(request: Request, response: Response): void {
		const {
			code,
			clientCode,
			managerCode,
			dateSale,
			hasPhysicalProduct,
			saleItems,
			payment,
			carrierCode,
		} = request.body;

		const saleItemsTyped = saleItems as Array<{
			quantity: number;
			codeProduct: number;
		}>;

		let paymentInstance: Payment;

		if (payment.pixCode) {
			paymentInstance = new Pix(payment.codeNote, payment.pixCode);
		} else if (payment.flag) {
			paymentInstance = new Card(
				payment.codeNote,
				payment.flag,
				payment.name,
				payment.number,
			);
		} else {
			paymentInstance = new Receipt(payment.codeNote);
		}

		const client = EletronicGamesSystem.clients.find(
			(client) => client.code === Number(clientCode),
		);

		if (!client) {
			response.status(400).json();
			return;
		}

		client.level += 1;

		const manager = EletronicGamesSystem.managers.find(
			(manager) => manager.code === Number(managerCode),
		);

		if (!manager) {
			response.status(400).json();
			return;
		}

		const carrier = EletronicGamesSystem.carriers.find(
			(carrier) => carrier.code === Number(carrierCode),
		);

		if (!carrier) {
			response.status(400).json();
			return;
		}

		const sale = new Sale(
			code,
			client,
			manager,
			new Date(dateSale),
			hasPhysicalProduct,
			paymentInstance,
			carrier,
		);

		for (const saleItem of saleItemsTyped) {
			sale.addSaleItem(new SaleItem(saleItem.quantity, saleItem.codeProduct));
		}
		EletronicGamesSystem.sales.push(sale);

		response.status(201).json(sale);
	}

	public saleListing(request: Request, response: Response): void {
		response.status(201).json(EletronicGamesSystem.sales);
	}

	public saleListingByPayment(request: Request, response: Response): void {
		const { paymentType } = request.query;

		switch (paymentType) {
			case "receipt":
				response.status(201).json(this.saleListingReceipt());
				break;
			case "pix":
				response.status(201).json(this.saleListingPix());
				break;
			case "Card":
				response.status(201).json(this.saleListingCard());
				break;
		}
	}

	private saleListingReceipt(): Sale[] {
		const it = new Iterator(EletronicGamesSystem.sales);
		const salesTyped: Sale[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Receipt) salesTyped.push(it.next());
		}
		return salesTyped;
	}

	private saleListingPix(): Sale[] {
		const it = new Iterator(EletronicGamesSystem.sales);
		const salesTyped: Sale[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Pix) salesTyped.push(it.next());
		}
		return salesTyped;
	}

	private saleListingCard(): Sale[] {
		const it = new Iterator(EletronicGamesSystem.sales);
		const salesTyped: Sale[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Card) salesTyped.push(it.next());
		}
		return salesTyped;
	}

	public saleListingMonth(request: Request, response: Response): void {
		const { month } = request.query;
		const monthParsed = parseInt(String(month));
		const it = new Iterator(EletronicGamesSystem.sales);
		const salesMonth: Sale[] = [];
		let profit: number = 0;
		while (it.hasNext()) {
			if (it.current().dateSale.getMonth() === monthParsed) {
				salesMonth.push(it.current());
				profit += it.next().priceDiscount;
			}
		}
		response.status(201).json({
			salesMonth,
			profit,
		});
	}

	public saleListingMonthDev(request: Request, response: Response): void {
		const { month, developerCode } = request.query;
		const monthParsed = parseInt(String(month));
		const developerCodeParsed = parseInt(String(developerCode));
		const itSale = new Iterator(EletronicGamesSystem.sales);
		const salesMonth: Sale[] = [];
		let profit: number = 0;
		while (itSale.hasNext()) {
			const itItem = new Iterator(itSale.current().saleItems);
			const game = EletronicGamesSystem.games.find(
				(game) => game.code === itItem.next().codeProduct,
			);

			if (!game) {
				response.status(400).json();
				return;
			}

			if (
				itSale.current().dateSale.getMonth() === monthParsed &&
				game.developer.code === developerCodeParsed
			) {
				salesMonth.push(itSale.current());
				profit += game.price;
			}
		}
		response.status(201).json({
			salesMonth,
			profit,
		});
	}
}

export default new SaleController();
