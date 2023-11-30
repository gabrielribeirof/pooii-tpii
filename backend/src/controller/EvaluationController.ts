import { type Request, type Response } from "express";

import { Evaluation } from "../model/Evaluation";
import { EletronicGamesSystem } from "../model/EletronicGamesSystem";

export class EvaluationController {
	public addEvaluation(request: Request, response: Response): void {
		const { exam, comment, clientCode, gameCode } = request.body;

		const client = EletronicGamesSystem.clients.find(
			(client) => client.code === clientCode,
		);

		if (!client) {
			response.status(400).send();
			return;
		}

		client.level += 0.5;

		const game = EletronicGamesSystem.games.find(
			(game) => game.code === gameCode,
		);

		if (!game) {
			response.status(400).send();
			return;
		}

		const evaluation = new Evaluation(exam, comment, client, game);

		EletronicGamesSystem.evaluations.push(evaluation);

		response.status(201).send(evaluation);
	}

	public evaluationListing(request: Request, response: Response): void {
		response.status(201).send(EletronicGamesSystem.evaluations);
	}
}
