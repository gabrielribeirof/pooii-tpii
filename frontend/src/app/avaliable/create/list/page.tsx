import styles from "../../page.module.css";
import { api } from "../../../services/api";
import { Card } from "../../../components/Card";

async function getCarriers() {
	const response = await api.get("/avaliable");

	return response.data as [
		{
			_code: string;
			_name: string;
			_star: number;
			_comment: string;
		},
	];
}

export default async function ListCarriers() {
	const data = await getCarriers();

	return (
		<div className={styles.container}>
			{data?.map((value) => (
				<Card
					key={value._code}
					properties={[
						{ label: "Código", value: value._code.toString() },
						{ label: "Name", value: value._name },
						{ label: "Quantidade de estrelas (1 a 5)", value: value._star },
						{ label: "Comentário", value: value._comment },
					]}
				/>
			))}
		</div>
	);
}
