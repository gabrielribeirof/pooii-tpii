import styles from "../../page.module.css";
import { api } from "../../../services/api";
import { Card } from "../../../components/Card";

async function getDevelopers() {
	const response = await api.get("/developer/developerListing");

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
	const developers = await getDevelopers();

	return (
		<div className={styles.container}>
			{developers?.map((developer) => (
				<Card
					key={developer._code}
					properties={[
						{ label: "Código", value: developer._code.toString() },
						{ label: "Name", value: developer._name },
						{ label: "CNPJ", value: developer._cnpj },
						{ label: "E-mail", value: developer._email },
						{ label: "Site", value: developer._site },
						{ label: "Rede social", value: developer._socialNetwork },
						{ label: "Endereço", value: developer._address },
					]}
				/>
			))}
		</div>
	);
}
