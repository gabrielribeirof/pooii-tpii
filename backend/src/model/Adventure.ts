import { Game } from "./Game";

export class Adventure extends Game {
	private readonly taxRate: number = 0.055;

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
