import { type Request, type Response } from "express";

import { Sale } from "../model/Sale";
import { EletronicGamesSystem } from "../model/EletronicGamesSystem";
import { SaleItem } from "../model/SaleItem";
import { Pix } from "../model/Pix";
import { type Payment } from "../model/Payment";
import { Card } from "../model/Card";
import { Receipt } from "../model/Receipt";
import { Iterator } from "../util/Iterator";
import { type Game } from "../model/Game";

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
			paymentInstance = new Pix(String(payment.codeNote));
		} else if (payment.flag) {
			paymentInstance = new Card(
				String(payment.codeNote),
				String(payment.flag),
				String(payment.name),
				String(payment.number),
			);
		} else {
			paymentInstance = new Receipt(String(payment.codeNote));
		}

		const client = EletronicGamesSystem.clients.find(
			(client) => client.code === Number(clientCode),
		);

		if (!client) {
			response.status(400).json();
			return;
		}

		client.level += 1;

		const index = EletronicGamesSystem.clients.findIndex(
			(client) => client.code === Number(clientCode),
		);

		EletronicGamesSystem.clients[index] = client;

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
			sale.addSaleItem(
				new SaleItem(Number(saleItem.quantity), Number(saleItem.codeProduct)),
			);
		}
		EletronicGamesSystem.sales.push(sale);

		response.status(201).json(sale);
	}

	public saleListing(request: Request, response: Response): void {
		response.status(201).json(EletronicGamesSystem.sales);
	}

	public saleListingByPayment(request: Request, response: Response): void {
		const { paymentType } = request.query;

		console.log(paymentType);

		switch (paymentType) {
			case "receipt":
				response.status(201).json(this.saleListingReceipt());
				break;
			case "pix":
				response.status(201).json(this.saleListingPix());
				break;
			case "card":
				response.status(201).json(this.saleListingCard());
				break;
		}
	}

	private saleListingReceipt(): Sale[] {
		const it = new Iterator(EletronicGamesSystem.sales);
		const salesTyped: Sale[] = [];
		while (it.hasNext()) {
			if (it.current().payment instanceof Receipt) {
				salesTyped.push(it.next());
			} else {
				it.next();
			}
		}
		return salesTyped;
	}

	private saleListingPix(): Sale[] {
		const it = new Iterator(EletronicGamesSystem.sales);
		const salesTyped: Sale[] = [];
		while (it.hasNext()) {
			if (it.current().payment instanceof Pix) salesTyped.push(it.next());
			else {
				it.next();
			}
		}
		return salesTyped;
	}

	private saleListingCard(): Sale[] {
		const it = new Iterator(EletronicGamesSystem.sales);
		const salesTyped: Sale[] = [];
		while (it.hasNext()) {
			if (it.current().payment instanceof Card) salesTyped.push(it.next());
			else {
				it.next();
			}
		}
		return salesTyped;
	}

	public saleListingMonth(request: Request, response: Response): void {
		const { month } = request.query;
		const monthParsed = parseInt(String(month)) - 1;
		const it = new Iterator(EletronicGamesSystem.sales);
		const salesMonth: Sale[] = [];
		let profit: number = 0;
		while (it.hasNext()) {
			if (it.current().dateSale.getMonth() === monthParsed) {
				salesMonth.push(it.current());
				profit += it.next().priceDiscount;
			} else {
				it.next();
			}
		}
		response.status(201).json({
			salesMonth,
			profit,
		});
	}

	public saleListingByClient(request: Request, response: Response): void {
		const { clientCode } = request.query;
		const clientCodeParsed = parseInt(String(clientCode));
		const it = new Iterator(EletronicGamesSystem.sales);
		const salesMonth: Sale[] = [];
		let profit: number = 0;
		while (it.hasNext()) {
			if (it.current().client.code === clientCodeParsed) {
				salesMonth.push(it.current());
				profit += it.next().priceDiscount;
			} else {
				it.next();
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
			if (itSale.current().dateSale.getMonth() + 1 !== monthParsed) {
				itSale.next();
				continue;
			}

			const itemsCode = itSale
				.current()
				.saleItems.map((saleItem) => saleItem.codeProduct);

			const games: Game[] = [];

			itemsCode.forEach((code) => {
				const game = EletronicGamesSystem.games.find(
					(game) =>
						game.code === code && game.developer.code === developerCodeParsed,
				);

				if (game) {
					games.push(game);
				}
			});

			if (!games.length) {
				response.status(400).json();
				return;
			}

			salesMonth.push(itSale.next());

			profit += games.reduce((acc, game) => acc + game.price, 0);
		}
		response.status(201).json({
			salesMonth,
			profit,
		});
	}
}

export default new SaleController();
