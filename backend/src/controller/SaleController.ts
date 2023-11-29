import { type Request, type Response } from "express";

import { Sale } from "../model/Sale";
import { EletronicGamesSystem } from "../model/EletronicGamesSystem";

export class SaleController {
	public addSale(request: Request, response: Response): void {
		const {
			code,
			client,
			manager,
			dateSale,
			hasPhysicalProduct,
			payment,
			carrier,
		} = request.body;

		client.level += 1;

		const sale = new Sale(
			code,
			client,
			manager,
			dateSale,
			hasPhysicalProduct,
			payment,
			carrier,
		);

		EletronicGamesSystem.sales.push(sale);

		response.status(201).send(sale);
	}
}
