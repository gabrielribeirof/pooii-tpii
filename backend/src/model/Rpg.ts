import { Game } from "./Game";
import { type Developer } from "./Developer";
export class Rpg extends Game {
	private readonly taxRate: number = 0.0375;

	public calculateValue(): number {
		return this.price + this.price * this.taxRate;
	}

	public toString(): string {
		return JSON.stringify(this);
	}

	public static fromJSON(json: string): Game {
		return JSON.parse(json);
	}

	public toJSON(): string {
		return JSON.stringify(this);
	}
}
