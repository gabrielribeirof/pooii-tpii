import { type Game } from "./Game";
import { type StrategySort } from "./StrategySort";

export class BubbleSort implements StrategySort {
	public sort(arr: Game[]): Game[] {
		const size = arr.length;

		for (let i = 0; i < size - 1; i++) {
			for (let j = 0; j < size - i - 1; j++) {
				if (arr[j] > arr[j + 1]) {
					this.swap(arr, j, j + 1);
				}
			}
		}
		return arr;
	}

	public sortFaster(arr: Game[]): void {
		const size = arr.length;
		let swapped: boolean = false;

		for (let i = 0; i < size - 1; i++) {
			swapped = false;

			for (let j = 0; j < size - i - 1; j++) {
				if (arr[j].exam > arr[j + 1].exam) {
					this.swap(arr, j, j + 1);
					swapped = true;
				}
			}
			// If no swaps happened, we have a sorted array:
			if (!swapped) {
				break;
			}
		}
	}

	private swap(arr: Game[], a: number, b: number): void {
		const tmp = arr[a];
		arr[a] = arr[b];
		arr[b] = tmp;
	}
}
