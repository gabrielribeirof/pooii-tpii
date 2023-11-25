import { Carrier } from "./Carrier";
import { Client } from "./Client";
import { Developer } from "./Developer";
import { Game } from "./Game";
import { Manager } from "./Manager";
import { Sale } from "./Sale";
import { type User } from "./User";

export class EletronicGamesSystem {
	private _platformName: string;
	private _sales: Array<Sale>;
	private _games: Array<Game>;
	private _developers: Array<Developer>;
	private _carriers: Array<Carrier>;
	private _clients: Array<Client>;
	private _managers: Array<Manager>;

	constructor(platformName: string) {
		this._platformName = platformName;
		this._sales = new Array<Sale>;
		this._games = new Array<Game>;
		this._developers = new Array<Developer>;
		this._carriers = new Array<Carrier>;
		this._clients = new Array<Client>;
		this._managers = new Array<Manager>;
	}

	get platformName(): string {
		return this._platformName;
	}

	set platformName(value: string) {
		this._platformName = value;
	}

	get sales(): Array<Sale> {
		return this._sales;
	}

	set sales(value: Array<Sale>) {
		this._sales = value;
	}

	get games(): Array<Game> {
		return this._games;
	}

	set games(value: Array<Game>) {
		this._games = value;
	}

	get developers(): Array<Developer> {
		return this._developers;
	}

	set developers(value: Array<Developer>) {
		this._developers = value;
	}

	get carriers(): Array<Carrier> {
		return this._carriers;
	}

	set carriers(value: Array<Carrier>) {
		this._carriers = value;
	}

	get clients(): Array<Client> {
		return this._clients;
	}

	set clients(value: Array<Client>) {
		this._clients = value;
	}

	get managers(): Array<Manager> {
		return this._managers;
	}

	set managers(value: Array<Manager>) {
		this._managers = value;
	}
}
