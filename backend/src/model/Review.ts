import { type Client } from "./Client";
import { type Game } from "./Game";

export class Review {
	private _note: number;
	private _comment: string;
	private _client: Client;
	private _game: Game;

	constructor(note: number, comment: string, client: Client, game: Game) {
		this._note = note;
		this._comment = comment;
		this._client = client;
		this._game = game;
	}

	get note(): number {
		return this._note;
	}

	set note(value: number) {
		this._note = value;
	}

	get comment(): string {
		return this._comment;
	}

	set comment(value: string) {
		this._comment = value;
	}

	get client(): Client {
		return this._client;
	}

	set client(value: Client) {
		this._client = value;
	}

	get game(): Game {
		return this._game;
	}

	set game(value: Game) {
		this._game = value;
	}
}
