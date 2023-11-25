import { Action } from "./Action";
import { Adventure } from "./Adventure";
import { Developer } from "./Developer";
import { Rpg } from "./Rpg";
import { Game } from "./Game";
import { Sport } from "./Sport";
import { Running } from "./Running";

export class FactoryGame{
    public static factoryMethod(gameType: string,
        code: number,
		name: string,
		description: string,
		developer: Developer,
		dateNew: Date,
		price: number,
		exam: number,
		requirimentMin: string,
		comment: string,
		avaliable: boolean,): Game {
        switch(gameType){
            case "action":
                return new Action(code, name, description, developer, dateNew, price, exam, requirimentMin, comment, avaliable);
                break;
            case "adventure":
                return new Adventure(code, name, description, developer, dateNew, price, exam, requirimentMin, comment, avaliable);
                break;
            case "rpg":
                return new Rpg(code, name, description, developer, dateNew, price, exam, requirimentMin, comment, avaliable);
                break;
            case "sport":
                return new Sport(code, name, description, developer, dateNew, price, exam, requirimentMin, comment, avaliable);
                break;
            case "running":
                return new Running(code, name, description, developer, dateNew, price, exam, requirimentMin, comment, avaliable);
                break;
            default:
                return new Action(code, name, description, developer, dateNew, price, exam, requirimentMin, comment, avaliable);
        }
    }
}