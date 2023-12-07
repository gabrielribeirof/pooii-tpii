import { type Request, type Response } from "express";

import { Review } from "../model/Review";
import { EletronicGamesSystem } from "../model/EletronicGamesSystem";

class ReviewController {
	public addReview(request: Request, response: Response): void {
		const { note, comment, clientCode, gameCode } = request.body;

		const client = EletronicGamesSystem.clients.find(
			(client) => client.code === Number(clientCode),
		);

		if (!client) {
			response.status(400).json();
			return;
		}

		client.level += 0.5;

		let index = EletronicGamesSystem.clients.findIndex(
			(client) => client.code === Number(clientCode),
		);

		EletronicGamesSystem.clients[index] = client;

		const game = EletronicGamesSystem.games.find(
			(game) => game.code === Number(gameCode),
		);

		if (!game) {
			response.status(400).json();
			return;
		}

		const review = new Review(Number(note), comment, client, game);

		EletronicGamesSystem.reviews.push(review);

		game.quantityReviews++;

		console.log("Nota: " + game.calculateNote());

		index = EletronicGamesSystem.games.findIndex(
			(game) => game.code === Number(gameCode),
		);

		EletronicGamesSystem.games[index] = game;

		response.status(201).json(review);
	}

	public ReviewListing(request: Request, response: Response): void {
		response.status(201).json(EletronicGamesSystem.reviews);
	}
}

export default new ReviewController();
