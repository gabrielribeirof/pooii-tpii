import { EletronicGamesSystem } from "./EletronicGamesSystem";
import { type Game } from "./Game";
import { type StrategySort } from "./StrategySort";

export class Context {
	private _strategy?: StrategySort;

	get strategy(): StrategySort | undefined {
		return this._strategy;
	}

	set strategy(value: StrategySort) {
		this._strategy = value;
	}

	public executeStrategy(arr: Game[]): void {
		if (this.strategy !== undefined) {
			EletronicGamesSystem.games = this.strategy.sort(arr);
		}
	}
}
