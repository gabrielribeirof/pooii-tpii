import { type Carrier } from "./Carrier";
import { type Client } from "./Client";
import { type Developer } from "./Developer";
import { type Review } from "./Review";
import { type Game } from "./Game";
import { type Manager } from "./Manager";
import { type Sale } from "./Sale";

export class EletronicGamesSystem {
	private static _platformName: string;
	private static _sales: Sale[];
	private static _games: Game[];
	private static _developers: Developer[];
	private static _carriers: Carrier[];
	private static _clients: Client[];
	private static _managers: Manager[];
	private static _reviews: Review[];

	constructor(platformName: string) {
		EletronicGamesSystem._platformName = platformName;
		EletronicGamesSystem._sales = new Array<Sale>();
		EletronicGamesSystem._games = new Array<Game>();
		EletronicGamesSystem._developers = new Array<Developer>();
		EletronicGamesSystem._carriers = new Array<Carrier>();
		EletronicGamesSystem._clients = new Array<Client>();
		EletronicGamesSystem._managers = new Array<Manager>();
		EletronicGamesSystem._reviews = new Array<Review>();
	}

	static get platformName(): string {
		return this._platformName;
	}

	static set platformName(value: string) {
		this._platformName = value;
	}

	static get sales(): Sale[] {
		return this._sales;
	}

	static set sales(value: Sale[]) {
		this._sales = value;
	}

	static get games(): Game[] {
		return this._games;
	}

	static set games(value: Game[]) {
		this._games = value;
	}

	static get developers(): Developer[] {
		return this._developers;
	}

	static set developers(value: Developer[]) {
		this._developers = value;
	}

	static get carriers(): Carrier[] {
		return this._carriers;
	}

	static set carriers(value: Carrier[]) {
		this._carriers = value;
	}

	static get clients(): Client[] {
		return this._clients;
	}

	static set clients(value: Client[]) {
		this._clients = value;
	}

	static get managers(): Manager[] {
		return this._managers;
	}

	static set managers(value: Manager[]) {
		this._managers = value;
	}

	static get reviews(): Review[] {
		return this._reviews;
	}

	static set reviews(value: Review[]) {
		this._reviews = value;
	}
}
