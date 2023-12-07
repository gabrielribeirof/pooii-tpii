import { Action } from "./Action";
import { Adventure } from "./Adventure";
import { type Developer } from "./Developer";
import { Rpg } from "./Rpg";
import { type Game } from "./Game";
import { Sport } from "./Sport";
import { Running } from "./Running";

export class FactoryGame {
	public static factoryMethod(
		gameType: string,
		code: number,
		name: string,
		description: string,
		developer: Developer,
		dateNew: Date,
		price: number,
		requirimentMin: string,
		avaliable: boolean,
	): Game {
		switch (gameType) {
			case "action":
				return new Action(
					code,
					name,
					description,
					developer,
					dateNew,
					price,
					requirimentMin,
					avaliable,
				);
				break;
			case "adventure":
				return new Adventure(
					code,
					name,
					description,
					developer,
					dateNew,
					price,
					requirimentMin,
					avaliable,
				);
				break;
			case "rpg":
				return new Rpg(
					code,
					name,
					description,
					developer,
					dateNew,
					price,
					requirimentMin,
					avaliable,
				);
				break;
			case "sport":
				return new Sport(
					code,
					name,
					description,
					developer,
					dateNew,
					price,
					requirimentMin,
					avaliable,
				);
				break;
			case "running":
				return new Running(
					code,
					name,
					description,
					developer,
					dateNew,
					price,
					requirimentMin,
					avaliable,
				);
				break;
			default:
				return new Action(
					code,
					name,
					description,
					developer,
					dateNew,
					price,
					requirimentMin,
					avaliable,
				);
		}
	}
}
