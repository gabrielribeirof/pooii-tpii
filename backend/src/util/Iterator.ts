export class Iterator<T> {
	private readonly array: T[];
	private position: number = 0;

	constructor(array: T[]) {
		this.array = array || [];
	}

	public nextPosition(): number {
		return this.position + 1;
	}

	// Return the current element.
	public current(): T {
		return this.array[this.position];
	}

	// Return the current element and move forward to next element.
	public next(): T {
		const item = this.array[this.position];
		this.position += 1;
		return item;
	}

	// Return the key of the current element.
	public key(): number {
		return this.position;
	}

	// Checks if current position is valid.
	public valid(): boolean {
		return this.position < this.array.length;
	}

	// Rewind the Iterator to the first element.
	public rewind(): void {
		this.position = 0;
	}

	// Verify if the array has next element.
	public hasNext(): boolean {
		return this.position < this.array.length;
	}
}
