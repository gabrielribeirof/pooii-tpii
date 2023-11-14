import { type User } from "./User";

export class EletronicGamesSystem {
	private _platformName: string;
	private readonly _clients: User[] = [];
	private readonly _managers: User[] = [];

	constructor(platformName: string) {
		this._platformName = platformName;
	}

	get platformName(): string {
		return this._platformName;
	}

	set platformName(value: string) {
		this._platformName = value;
	}

	get clients(): User[] {
		return this._clients;
	}

	get managers(): User[] {
		return this._managers;
	}
}
