import { type Request, type Response } from "express";
import { Developer } from "../model/Developer";
import { EletronicGamesSystem } from "../model/EletronicGamesSystem";
import { FactoryGame } from "../model/FactoryGame";
import { Game } from "../model/Game";

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
            avaliable);

        EletronicGamesSystem.games.push(game);

        response.status(201).send(game);
    }
}