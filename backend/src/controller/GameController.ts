import { type Request, type Response } from "express";

import { EletronicGamesSystem } from "../model/EletronicGamesSystem";
import { FactoryGame } from "../model/FactoryGame";
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

class GameController {
	public addGame(request: Request, response: Response): void {
		const {
			gameType,
			code,
			name,
			description,
			developerCode,
			dateNew,
			price,
			requirimentMin,
			avaliable,
		} = request.body;

		const developer = EletronicGamesSystem.developers.find(
			(developer) => developer.code === Number(developerCode),
		);

		console.log(EletronicGamesSystem.developers)

		if (!developer) {
			response.status(400).json();
			return;
		}

		const game = FactoryGame.factoryMethod(
			gameType,
			Number(code),
			name,
			description,
			developer,
			new Date(dateNew),
			Number(price),
			requirimentMin,
			avaliable === 'true',
		);

		EletronicGamesSystem.games.push(game);

		response.status(201).json(game);
	}

	public gameListing(request: Request, response: Response): void {
		const { gameType } = request.query;

		switch (gameType) {
			case "action":
				response.status(201).json(this.gameListingAction());
				break;
			case "adventure":
				response.status(201).json(this.gameListingAdventure());
				break;
			case "rpg":
				response.status(201).json(this.gameListingRpg());
				break;
			case "running":
				response.status(201).json(this.gameListingRunning());
				break;
			case "sport":
				response.status(201).json(this.gameListingSport());
				break;
			default:
				response.status(201).json(EletronicGamesSystem.games);
				break;
		}
	}

	private gameListingAction(): Game[] {
		const it = new Iterator(EletronicGamesSystem.games);
		const gamesCategory: Game[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Action) {
				gamesCategory.push(it.next());
			} else {
				it.next();
			}
		}
		return gamesCategory;
	}

	private gameListingAdventure(): Game[] {
		const it = new Iterator(EletronicGamesSystem.games);
		const gamesCategory: Game[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Adventure) {
				gamesCategory.push(it.next());
			} else {
				it.next();
			}
		}
		return gamesCategory;
	}

	private gameListingRpg(): Game[] {
		const it = new Iterator(EletronicGamesSystem.games);
		const gamesCategory: Game[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Rpg) {
				gamesCategory.push(it.next());
			} else {
				it.next();
			}
		}
		return gamesCategory;
	}

	private gameListingRunning(): Game[] {
		const it = new Iterator(EletronicGamesSystem.games);
		const gamesCategory: Game[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Running) {
				gamesCategory.push(it.next());
			} else {
				it.next();
			}
		}
		return gamesCategory;
	}

	private gameListingSport(): Game[] {
		const it = new Iterator(EletronicGamesSystem.games);
		const gamesCategory: Game[] = [];
		while (it.hasNext()) {
			if (it.current() instanceof Sport) {
				gamesCategory.push(it.next());
			} else {
				it.next();
			}
		}
		return gamesCategory;
	}

	public gameListingOrdered(request: Request, response: Response): void {
		const { sortType } = request.query;

		switch (sortType) {
			case "quicksort":
				response.status(201).json(this.gameListingQuicksort());
				break;
			case "bubblesort":
				response.status(201).json(this.gameListingBlubblesort());
				break;
			case "expensive":
				response.status(201).json(this.gameListingExpensive());
				break;
			case "cheap":
				response.status(201).json(this.gameListingCheap());
				break;
			default:
				response.status(400).send();
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

	private gameListingExpensive(): Game[] {
		return EletronicGamesSystem.games
			.sort((a, b) => a.price - b.price) // sort by price
			.slice(
				// takes the last 10 elements of array ordered, that is the higher price
				EletronicGamesSystem.games.length - 10,
				EletronicGamesSystem.games.length,
			);
	}

	private gameListingCheap(): Game[] {
		return EletronicGamesSystem.games
			.sort((a, b) => a.price - b.price)
			.slice(0, 11); // takes the fist 10 elements of array ordered, that is the lower price
	}
}

export default new GameController();
