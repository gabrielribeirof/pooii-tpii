import { type Request, type Response } from "express";

import { Review } from "../model/Review";
import { EletronicGamesSystem } from "../model/EletronicGamesSystem";

export class ReviewController {
	public addReview(request: Request, response: Response): void {
		const { note, comment, clientCode, gameCode } = request.body;

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

		game.quantityReviews++;

		const review = new Review(note, comment, client, game);

		EletronicGamesSystem.reviews.push(review);

		response.status(201).send(review);
	}

	public ReviewListing(request: Request, response: Response): void {
		response.status(201).send(EletronicGamesSystem.reviews);
	}
}
