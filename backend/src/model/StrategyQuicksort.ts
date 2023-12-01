import { type Game } from "./Game";
import { type StrategySort } from "./StrategySort";

export class StrategyQuicksort implements StrategySort {
	public sort(arr: Game[]): Game[] {
		this.quicksort(arr, 0, arr.length - 1);
		return arr;
	}

	private quicksort(arr: Game[], low: number, high: number): void {
		if (low < high) {
			const p = this.partition(arr, low, high);

			this.quicksort(arr, low, p - 1);
			this.quicksort(arr, p + 1, high);
		}
	}

	private partition(arr: Game[], low: number, high: number): number {
		const pivot = arr[high].note;
		let i = low;
		for (let j = low; j < high; j++) {
			if (arr[j].note < pivot) {
				this.swap(arr, i, j);
				i++;
			}
		}
		this.swap(arr, i, high);
		return i;
	}

	private swap(arr: Game[], a: number, b: number): void {
		const tmp = arr[a];
		arr[a] = arr[b];
		arr[b] = tmp;
	}
}
