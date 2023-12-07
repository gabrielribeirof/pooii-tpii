import { type Request, type Response } from "express";

import { Carrier } from "../model/Carrier";
import { EletronicGamesSystem } from "../model/EletronicGamesSystem";

class CarrierController {
	public addCarrier(request: Request, response: Response): void {
		const { code, cnpj, name, email, phone, deliveryTime, address } =
			request.body;

		const carrier = new Carrier(
			Number(code),
			cnpj,
			name,
			email,
			phone,
			Number(deliveryTime),
			address,
		);

		EletronicGamesSystem.carriers.push(carrier);

		response.status(201).json(carrier);
	}

	public developerListing(request: Request, response: Response): void {
		response.status(201).json(EletronicGamesSystem.carriers);
	}
}

export default new CarrierController();
