import { type Request, type Response } from "express";

import { EletronicGamesSystem } from "../model/EletronicGamesSystem";
import { FactoryGame } from "../model/FactoryGame";
import { Evaluation } from "../model/Evaluation";
import { Iterator } from "../util/Iterator";
import { type Game } from "../model/Game";
import { Action } from "../model/Action";
import { Adventure } from "../model/Adventure";
import { Rpg } from "../model/Rpg";
import { Running } from "../model/Running";
import { Sport } from "../model/Sport";
import { Context } from "../model/Context";
import { StrategyQuicksort } from "../model/StrategyQuicksort";
import { StrategyBubbleSort } from "../model/StrategyBubblesort";

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

	public gameListing(request: Request, response: Response): void {
		const { gameType } = request.query;

		switch (gameType) {
			case "action":
				response.status(201).send(this.gameListingAction());
				break;
			case "adventure":
				response.status(201).send(this.gameListingAdventure());
				break;
			case "rpg":
				response.status(201).send(this.gameListingRpg());
				break;
			case "running":
				response.status(201).send(this.gameListingRunning());
				break;
			case "sport":
				response.status(201).send(this.gameListingSport());
				break;
			default:
				response.status(201).send(EletronicGamesSystem.games);
				break;
		}
	}

	private gameListingAction(): Game[] {
		const it = new Iterator(EletronicGamesSystem.games);
		const gamesCategory: Game[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Action) gamesCategory.push(it.next());
		}
		return gamesCategory;
	}

	private gameListingAdventure(): Game[] {
		const it = new Iterator(EletronicGamesSystem.games);
		const gamesCategory: Game[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Adventure) gamesCategory.push(it.next());
		}
		return gamesCategory;
	}

	private gameListingRpg(): Game[] {
		const it = new Iterator(EletronicGamesSystem.games);
		const gamesCategory: Game[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Rpg) gamesCategory.push(it.next());
		}
		return gamesCategory;
	}

	private gameListingRunning(): Game[] {
		const it = new Iterator(EletronicGamesSystem.games);
		const gamesCategory: Game[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Running) gamesCategory.push(it.next());
		}
		return gamesCategory;
	}

	private gameListingSport(): Game[] {
		const it = new Iterator(EletronicGamesSystem.games);
		const gamesCategory: Game[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Sport) gamesCategory.push(it.next());
		}
		return gamesCategory;
	}

	public gameListingOrdered(request: Request, response: Response): void {
		const { sortType } = request.query;

		switch (sortType) {
			case "quicksort":
				response.status(201).send(this.gameListingQuicksort());
				break;
			case "bubblesort":
				response.status(201).send(this.gameListingBlubblesort());
				break;
			case "asc":
				response.status(201).send(this.gameListingAsc());
				break;
			case "desc":
				response.status(201).send(this.gameListingDesc());
				break;
			default:
				break;
		}
	}

	private gameListingQuicksort(): Game[] {
		const context = new Context();
		context.strategy = new StrategyQuicksort();
		context.executeStrategy(EletronicGamesSystem.games);
		return EletronicGamesSystem.games;
	}

	private gameListingBlubblesort(): Game[] {
		const context = new Context();
		context.strategy = new StrategyBubbleSort();
		context.executeStrategy(EletronicGamesSystem.games);
		return EletronicGamesSystem.games;
	}

	private gameListingAsc(): Game[] {
		return this.gameListingQuicksort().slice(0, 11);
	}

	private gameListingDesc(): Game[] {
		return this.gameListingQuicksort().slice(
			this.gameListingQuicksort().length - 11,
			this.gameListingQuicksort().length,
		);
	}
}
