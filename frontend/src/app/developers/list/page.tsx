import styles from "../../page.module.css";
import { api } from "../../../services/api";
import { Card } from "../../../components/Card";

async function getDevelopers() {
	const response = await api.get("/developers");

	return response.data as [
		{
			_code: number;
			_cnpj: string;
			_name: string;
			_email: string;
			_site: string;
			_socialNetwork: string;
			_address: string;
		},
	];
}

export default async function ListDevelopers() {
	const data = await getDevelopers();

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
						{ label: "Site", value: value._site },
						{ label: "Rede social", value: value._socialNetwork },
						{ label: "Endereço", value: value._address },
					]}
				/>
			))}
		</div>
	);
}
