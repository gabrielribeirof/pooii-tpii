import { type Request, type Response } from "express";

import { Developer } from "../model/Developer";
import { EletronicGamesSystem } from "../model/EletronicGamesSystem";
import { Iterator } from "../util/Iterator";

export class DeveloperController {
	public addDeveloper(request: Request, response: Response): void {
		const { code, cnpj, name, email, site, socialNetwork, address } =
			request.body;

		const developer = new Developer(
			code,
			cnpj,
			name,
			email,
			site,
			socialNetwork,
			address,
		);

		EletronicGamesSystem.developers.push(developer);

		response.status(201).send(developer);
	}

	public developerListing(request: Request, response: Response): void {
		response.status(201).send(EletronicGamesSystem.developers);
	}

	public developerListingByMoreSales(
		request: Request,
		response: Response,
	): void {
		const developersSales: Array<[Developer, number]> = [];
		const itDev = new Iterator(EletronicGamesSystem.developers);
		while (itDev.hasNext()) {
			developersSales.push([itDev.next(), 0]);
		}

		const itSale = new Iterator(EletronicGamesSystem.sales);
		while (itSale.hasNext()) {
			const itItem = new Iterator(itSale.next().saleItems);
			while (itItem.hasNext()) {
				const game = EletronicGamesSystem.games.find(
					(game) => game.code === itItem.next().codeProduct,
				);

				if (game) {
					const index = developersSales.findIndex(
						(developer) => developer[0].code === game.developer.code,
					);
					if (index >= 0) {
						developersSales[index][1]++;
					}
				}
			}
		}

		response
			.status(201)
			.send(
				developersSales.sort((a, b) => a[1] - b[1]).map((value) => value[0]),
			);
	}

	public developerListingByProfit(request: Request, response: Response): void {
		const developersSales: Array<[Developer, number]> = [];
		const itDev = new Iterator(EletronicGamesSystem.developers);
		while (itDev.hasNext()) {
			developersSales.push([itDev.next(), 0]);
		}

		const itSale = new Iterator(EletronicGamesSystem.sales);
		while (itSale.hasNext()) {
			const itItem = new Iterator(itSale.next().saleItems);
			while (itItem.hasNext()) {
				const game = EletronicGamesSystem.games.find(
					(game) => game.code === itItem.current().codeProduct,
				);

				if (game) {
					const index = developersSales.findIndex(
						(developer) => developer[0].code === game.developer.code,
					);
					if (index >= 0) {
						developersSales[index][1] += itItem.next().price;
					}
				}
			}
		}

		response
			.status(201)
			.send(
				developersSales.sort((a, b) => a[1] - b[1]).map((value) => value[0]),
			);
	}
}
