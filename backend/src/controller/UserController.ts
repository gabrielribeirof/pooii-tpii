import { type Request, type Response } from "express";

import { EletronicGamesSystem } from "../model/EletronicGamesSystem";
import { Client } from "../model/Client";
import { Manager } from "../model/Manager";
import { Iterator } from "../util/Iterator";

class UserController {
	public addClient(request: Request, response: Response): void {
		const { code, name, cpf, rg, birth, address, zipcode, email, isEpic } =
			request.body;

		const client = new Client(
			code,
			name,
			cpf,
			rg,
			new Date(birth),
			address,
			zipcode,
			email,
			new Date(),
			0,
			isEpic,
		);

		EletronicGamesSystem.clients.push(client);

		response.status(201).json(client);
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

		response.status(201).json(manager);
	}

	public userListing(request: Request, response: Response): void {
		const { userType } = request.query;

		switch (userType) {
			case "client":
				response.status(200).json(EletronicGamesSystem.clients);
				break;
			case "manager":
				response.status(200).json(EletronicGamesSystem.managers);
				break;
			case "epic":
				console.log(this);
				response.status(200).json(this.userListingEpic());
				break;
			case "level":
				console.log(this);
				response.status(200).json(this.userListingLevel());
				break;
			default:
				response.status(400).send();
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
		const d = EletronicGamesSystem.clients
			.sort((a, b) => a.level - b.level) // clients ascending ordered by level
			.slice(
				// takes the last 10 elements of array ordered, that is the higher level
				EletronicGamesSystem.clients.length - 10,
				EletronicGamesSystem.clients.length,
			);

		console.log(d);
		return d;
	}
}

export default new UserController();
