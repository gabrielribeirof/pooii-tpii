import { type Request, type Response } from "express";

import { EletronicGamesSystem } from "../model/EletronicGamesSystem";
import { FactoryGame } from "../model/FactoryGame";

export class GameController {
	public addGame(request: Request, response: Response): void {
		const {
			gameType,
			code,
			name,
			description,
			developer,
			dateNew,
			price,
			exam,
			requirimentMin,
			comment,
			avaliable,
		} = request.body;

		const game = FactoryGame.factoryMethod(
			gameType,
			code,
			name,
			description,
			developer,
			dateNew,
			price,
			exam,
			requirimentMin,
			comment,
			avaliable,
		);

		EletronicGamesSystem.games.push(game);

		response.status(201).send(game);
	}
}
