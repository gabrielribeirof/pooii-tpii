"use client";

import { useForm } from "react-hook-form";

import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { api } from "../../../services/api";

interface FormData {
	code: number;
	cnpj: string;
	name: string;
	email: string;
	site: string;
	socialNetwork: string;
	address: string;
}

export default function CreateDeveloper() {
	const { register, handleSubmit } = useForm<FormData>();

	async function onSubmit(data: FormData) {
		try {
			await api.post("/developers", data);
			alert("Cadastrado com sucesso");
		} catch (error) {
			alert("Erro ao cadatrar");
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input {...register("code")} label="Code" required />

			<Input {...register("cnpj")} label="CNPJ" required />

			<Input {...register("name")} label="Nome" required />

			<Input {...register("email")} label="E-mail" required />

			<Input {...register("site")} label="Site" required />

			<Input {...register("socialNetwork")} label="Redes sociais" required />

			<Input {...register("address")} label="Endereço" required />

			<Button type="submit">Salvar</Button>
		</form>
	);
}
