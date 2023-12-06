import { redirect } from "next/navigation";

import styles from "../../page.module.css";
import { api } from "../../../services/api";
import { Card } from "../../../components/Card";
import { parseDate } from "../../../services/parseDate";

async function getClients(type: "all" | "epic" | "level") {
	const response = await api.get("/users", {
		params: {
			userType: type === "all" ? "client" : type === "epic" ? "epic" : "level",
		},
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
			_registerDate: string;
			_level: number;
			_isEpic: boolean;
		},
	];
}

export default async function ListClients({
	params,
}: {
	params: { slug: "all" | "epic" | "level" };
}) {
	if (!["all", "epic", "level"].includes(params.slug)) {
		redirect("/not-found");
	}

	const data = await getClients(params.slug);

	return (
		<div className={styles.container}>
			{data?.map((value) => (
				<Card
					key={value._code}
					properties={[
						{ label: "Código", value: value._code.toString() },
						{ label: "Name", value: value._name },
						{ label: "E-mail", value: value._email },
						{ label: "CPF", value: value._cpf },
						{ label: "RG", value: value._rg },
						{
							label: "Data de nascimento",
							value: parseDate(new Date(value._birth)),
						},
						{ label: "Endereço", value: value._address },
						{ label: "CEP", value: value._zipcode },
						{
							label: "Data de registro",
							value: parseDate(new Date(value._registerDate)),
						},
						{ label: "Nível", value: String(value._level) },
						{ label: "É épico?", value: value._isEpic ? "Sim" : "Não" },
					]}
				/>
			))}
		</div>
	);
}
