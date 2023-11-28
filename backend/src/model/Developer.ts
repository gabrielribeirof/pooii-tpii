export class Developer {
	private readonly _code: number;
	private _cnpj: string;
	private _name: string;
	private _email: string;
	private _site: string;
	private _socialNetwork: string;
	private readonly _adress: string;

	constructor(
		code: number,
		cnpj: string,
		name: string,
		email: string,
		site: string,
		socialNetwork: string,
		adress: string,
	) {
		this._code = code;
		this._cnpj = cnpj;
		this._name = name;
		this._email = email;
		this._site = site;
		this._socialNetwork = socialNetwork;
		this._adress = adress;
	}

	get code(): number {
		return this.code;
	}

	set code(value: number) {
		this.code = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get cnpj(): string {
		return this._cnpj;
	}

	set cnpj(value: string) {
		this._cnpj = value;
	}

	get email(): string {
		return this._email;
	}

	set email(value: string) {
		this._email = value;
	}

	get site(): string {
		return this._site;
	}

	set site(value: string) {
		this._site = value;
	}

	get socialNetwork(): string {
		return this._socialNetwork;
	}

	set socialNetwork(value: string) {
		this._socialNetwork = value;
	}

	get adress(): string {
		return this._adress;
	}

	set adress(value: string) {
		this.adress = value;
	}

	public toString(): string {
		return JSON.stringify(this);
	}
}
