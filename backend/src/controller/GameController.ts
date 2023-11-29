import { type Request, type Response } from "express";

import { EletronicGamesSystem } from "../model/EletronicGamesSystem";
import { FactoryGame } from "../model/FactoryGame";
import { Evaluation } from "../model/Evaluation";

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

	public addEvaluation(request: Request, response: Response): void {
		const { exam, comment, client, game } = request.body;

		const evaluation = new Evaluation(exam, comment, client, game);

		EletronicGamesSystem.evaluations.push(evaluation);

		response.status(201).send(evaluation);
	}
}
