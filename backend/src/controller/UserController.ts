import { type Request, type Response } from "express";

import { EletronicGamesSystem } from "../model/EletronicGamesSystem";
import { Client } from "../model/Client";
import { Manager } from "../model/Manager";

export class UserController {
	public addClient(request: Request, response: Response): void {
		const {
			code,
			name,
			cpf,
			rg,
			birth,
			address,
			zipcode,
			email,
			registerDate,
			level,
			isEpic
		} = request.body;

		const client = new Client(
			code,
			name,
			cpf,
			rg,
			birth,
			address,
			zipcode,
			email,
			registerDate,
			level,
			isEpic
		)

		EletronicGamesSystem.clients.push(
			client
		);

		response.status(201).send(client);
	}

	public addManager(request: Request, response: Response): void {
		const {
			code,
			name,
			cpf,
			rg,
			birth,
			address,
			zipcode,
			email,
			salary,
			pis,
			admissionDate,
		} = request.body;

		EletronicGamesSystem.managers.push(
			new Manager(
				code,
				name,
				cpf,
				rg,
				birth,
				address,
				zipcode,
				email,
				salary,
				pis,
				admissionDate,
			),
		);

		response.status(201).send();
	}
}
