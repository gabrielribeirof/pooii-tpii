import { type Request, type Response } from "express";

import { EletronicGamesSystem } from "../model/EletronicGamesSystem";
import { Client } from "../model/Client";
import { Manager } from "../model/Manager";
import { Iterator } from "../util/Iterator";

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
			isEpic,
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
			isEpic,
		);

		EletronicGamesSystem.clients.push(client);

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

		const manager = new Manager(
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
		);

		EletronicGamesSystem.managers.push(manager);

		response.status(201).send(manager);
	}

	public userListing(request: Request, response: Response): void {
		const { userType } = request.query;

		switch (userType) {
			case "client":
				response.status(201).send(EletronicGamesSystem.clients);
				break;
			case "manager":
				response.status(201).send(EletronicGamesSystem.managers);
				break;
			case "epic":
				response.status(201).send(this.userListingEpic());
				break;
			case "level":
				response.status(201).send(this.userListingLevel());
				break;
		}
	}

	private userListingEpic(): Client[] {
		const it = new Iterator(EletronicGamesSystem.clients);
		const clientsEpic: Client[] = [];
		while (it.hasNext()) {
			if (it.current().isEpic) clientsEpic.push(it.next());
		}
		return clientsEpic;
	}

	private userListingLevel(): Client[] {
		return EletronicGamesSystem.clients
			.sort((a, b) => a.level - b.level) // clients ascending ordered by level
			.slice(
				// takes the last 10 elements of array ordered, that is the higher level
				EletronicGamesSystem.clients.length - 10,
				EletronicGamesSystem.clients.length,
			);
	}
}
