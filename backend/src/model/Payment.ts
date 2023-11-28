export abstract class Payment {
	protected _codeNote: string;

	constructor(codeNote: string) {
		this._codeNote = codeNote;
	}

	get codeNote(): string {
		return this._codeNote;
	}

	set codeNote(value: string) {
		this._codeNote = value;
	}

	public abstract toString(): string;
}
