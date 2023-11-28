import { Carrier } from "./Carrier";
import { Client } from "./Client";
import { Developer } from "./Developer";
import { Game } from "./Game";
import { Manager } from "./Manager";
import { Sale } from "./Sale";
import { type User } from "./User";

export class EletronicGamesSystem {
	private static _platformName: string;
	private static _sales: Array<Sale>;
	private static _games: Array<Game>;
	private static _developers: Array<Developer>;
	private static _carriers: Array<Carrier>;
	private static _clients: Array<Client>;
	private static _managers: Array<Manager>;

	constructor(platformName: string) {
		EletronicGamesSystem._platformName = platformName;
		EletronicGamesSystem._sales = new Array<Sale>;
		EletronicGamesSystem._games = new Array<Game>;
		EletronicGamesSystem._developers = new Array<Developer>;
		EletronicGamesSystem._carriers = new Array<Carrier>;
		EletronicGamesSystem._clients = new Array<Client>;
		EletronicGamesSystem._managers = new Array<Manager>;
	}

	static get platformName(): string {
		return this._platformName;
	}

	static set platformName(value: string) {
		this._platformName = value;
	}

	static get sales(): Array<Sale> {
		return this._sales;
	}

	static set sales(value: Array<Sale>) {
		this._sales = value;
	}

	static get games(): Array<Game> {
		return this._games;
	}

	static set games(value: Array<Game>) {
		this._games = value;
	}

	static get developers(): Array<Developer> {
		return this._developers;
	}

	static set developers(value: Array<Developer>) {
		this._developers = value;
	}

	static get carriers(): Array<Carrier> {
		return this._carriers;
	}

	static set carriers(value: Array<Carrier>) {
		this._carriers = value;
	}

	static get clients(): Array<Client> {
		return this._clients;
	}

	static set clients(value: Array<Client>) {
		this._clients = value;
	}

	static get managers(): Array<Manager> {
		return this._managers;
	}

	static set managers(value: Array<Manager>) {
		this._managers = value;
	}
}
