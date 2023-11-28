import { Game } from "./Game";
import { type Developer } from "./Developer";
export class Running extends Game {
	private readonly taxRate: number = 0.0725;

	public calculateValue(): number {
		return this.price + this.price * this.taxRate;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public static fromJSON(json: string): Game {
		return JSON.parse(json);
	}
}
