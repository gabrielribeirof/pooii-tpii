import styles from "../../page.module.css";
import { api } from "../../../services/api";
import { Card } from "../../../components/Card";
import { parseDate } from "../../../services/parseDate";

async function getManagers() {
	const response = await api.get("/users", {
		params: { userType: "manager" },
	});

	return response.data as [
		{
			_code: number;
			_name: string;
			_cpf: string;
			_rg: string;
			_birth: string;
			_address: string;
			_zipcode: string;
			_email: string;
			_salary: number;
			_pis: string;
			_admissionDate: string;
		},
	];
}

export default async function ListManagers() {
	const data = await getManagers();

	return (
		<div className={styles.container}>
			{data?.map((value) => (
				<Card
					key={value._code}
					properties={[
						{ label: "Código", value: value._code.toString() },
						{ label: "Nome", value: value._name },
						{ label: "E-mail", value: value._email },
						{ label: "CPF", value: value._cpf },
						{ label: "RG", value: value._rg },
						{
							label: "Data de nascimento",
							value: parseDate(new Date(value._birth)),
						},
						{ label: "Endereço", value: value._address },
						{ label: "CEP", value: value._zipcode },
						{ label: "Salário", value: String(value._salary) },
						{ label: "PIS", value: value._pis },
						{
							label: "Data de admissão",
							value: parseDate(new Date(value._admissionDate)),
						},
					]}
				/>
			))}
		</div>
	);
}
