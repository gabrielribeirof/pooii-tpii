import { Card } from "../components/Card";
import { api } from "../services/api";

import styles from "./page.module.css";

async function getGames() {
	const response = await api.get("/games");

	return response.data as [
		{
			_code: string;
			_name: string;
			_description: string;
			_developer: {
				_code: number;
				_cnpj: string;
				_name: string;
				_email: string;
				_site: string;
				_socialNetwork: string;
				_address: string;
			};
			_price: string;
			_note: number;
			_quantityReviews: number;
			taxRate: number;
		},
	];
}

export default async function Home() {
	const data = await getGames();
	return (
		<div className={styles.container}>
			{data?.map((value) => (
				<Card
					key={value._code}
					properties={[
						{ label: "Código", value: value._code.toString() },
						{ label: "Nome", value: value._name },
						{ label: "Descrição", value: value._description },
						{ label: "Desenvolvedora", value: value._developer._name },
						// { label: "Data de Lançamento", value: value._ },
						{ label: "Preço", value: value._price },
						{ label: "Nota", value: value._note.toString() },
						{
							label: "Quantidade de avaliações",
							value: value._quantityReviews.toString(),
						},
					]}
				/>
			))}
		</div>
	);
}
