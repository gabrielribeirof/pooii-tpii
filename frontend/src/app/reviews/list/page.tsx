import styles from "../../page.module.css";
import { api } from "../../../services/api";
import { Card } from "../../../components/Card";

async function getManagers() {
	const response = await api.get("/reviews");

	return response.data as [
		{
			_note: number;
			_comment: string;
			_client: {
				_code: number;
				_name: string;
				_cpf: string;
				_rg: string;
				_birth: string;
				_address: string;
				_zipcode: string;
				_email: string;
				_registerDate: string;
				_level: number;
				_isEpic: false;
			};
			_game: {
				_code: number;
				_name: string;
				_description: string;
				_developer: {
					_name: string;
				};
				_dateNew: string;
				_price: number;
				_note: null;
				_quantityReviews: number;
				_requirimentMin: string;
				_avaliable: true;
				taxRate: number;
			};
		},
	];
}

export default async function ListManagers() {
	const data = await getManagers();

	return (
		<div className={styles.container}>
			{data?.map((value) => (
				<Card
					key={value._comment}
					properties={[
						{ label: "Nota", value: value._note.toString() },
						{ label: "Comentário", value: value._comment },
						{ label: "Jogo", value: value._game._name },
						{ label: "Cliente", value: value._client._name },
					]}
				/>
			))}
		</div>
	);
}
