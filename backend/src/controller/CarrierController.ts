import { type Request, type Response } from "express";

import { Carrier } from "../model/Carrier";
import { EletronicGamesSystem } from "../model/EletronicGamesSystem";

export class CarrierController {
	public addCarrier(request: Request, response: Response): void {
		const { code, cnpj, name, email, phone, timeCarrier, address } =
			request.body;

		const carrier = new Carrier(
			code,
			cnpj,
			name,
			email,
			phone,
			timeCarrier,
			address,
		);

		EletronicGamesSystem.carriers.push(carrier);

		response.status(201).send(carrier);
	}

	public developerListing(request: Request, response: Response): void {
		response.status(201).send(EletronicGamesSystem.carriers);
	}
}
