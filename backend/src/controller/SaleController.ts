import { type Request, type Response } from "express";

import { Sale } from "../model/Sale";
import { EletronicGamesSystem } from "../model/EletronicGamesSystem";
import { SaleItem } from "../model/SaleItem";
import { Pix } from "../model/Pix";
import { type Payment } from "../model/Payment";
import { Card } from "../model/Card";
import { Receipt } from "../model/Receipt";

export class SaleController {
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
			price: number;
			quantity: number;
			codeProduct: number;
		}>;

		const paymentTyped = payment as object;
		let paymentInstance: Payment;

		if (paymentTyped instanceof Pix) {
			paymentInstance = new Pix(paymentTyped.codeNote, paymentTyped.pixCode);
		} else if (paymentTyped instanceof Card) {
			paymentInstance = new Card(
				paymentTyped.codeNote,
				paymentTyped.flag,
				paymentTyped.name,
				paymentTyped.number,
			);
		} else if (paymentTyped instanceof Receipt) {
			paymentInstance = new Receipt(paymentTyped.codeNote);
		} else {
			response.status(400).send();
			return;
		}

		const client = EletronicGamesSystem.clients.find(
			(client) => client.code === clientCode,
		);

		if (!client) {
			response.status(400).send();
			return;
		}

		client.level += 1;

		const manager = EletronicGamesSystem.managers.find(
			(manager) => manager.code === managerCode,
		);

		if (!manager) {
			response.status(400).send();
			return;
		}

		const carrier = EletronicGamesSystem.carriers.find(
			(carrier) => carrier.code === carrierCode,
		);

		if (!carrier) {
			response.status(400).send();
			return;
		}

		const sale = new Sale(
			code,
			client,
			manager,
			dateSale,
			hasPhysicalProduct,
			paymentInstance,
			carrier,
		);

		for (const saleItem of saleItemsTyped) {
			sale.addSaleItem(
				new SaleItem(saleItem.price, saleItem.quantity, saleItem.codeProduct),
			);
		}
		EletronicGamesSystem.sales.push(sale);

		response.status(201).send(sale);
	}
}
