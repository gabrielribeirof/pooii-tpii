import { type Game } from "./Game";

export interface StrategySort {
	sort: (games: Game[]) => Game[];
}
