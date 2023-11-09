import { type User } from "./User";

export class EletronicGamesSystem {
	private _platformName: string;
	private static readonly _clients: User[] = [];
	private static readonly _managers: User[] = [];

	constructor(platformName: string) {
		this._platformName = platformName;
	}

	get platformName(): string {
		return this._platformName;
	}

	set platformName(value: string) {
		this._platformName = value;
	}

	static get clients(): User[] {
		return this._clients;
	}

	static get managers(): User[] {
		return this._managers;
	}
}
