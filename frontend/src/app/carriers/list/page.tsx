import styles from "../../page.module.css";
import { api } from "../../../services/api";
import { Card } from "../../../components/Card";

async function getCarriers() {
	const response = await api.get("/carriers");

	return response.data as [
		{
			_code: number;
			_cnpj: string;
			_name: string;
			_email: string;
			_phone: string;
			_deliveryTime: number;
			_address: string;
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
						{ label: "Nome", value: value._name },
						{ label: "CNPJ", value: value._cnpj },
						{ label: "E-mail", value: value._email },
						{ label: "Telefone", value: value._phone },
						{
							label: "Tempo de entrega",
							value: String(value._deliveryTime),
						},
						{ label: "Endereço", value: value._address },
					]}
				/>
			))}
		</div>
	);
}
