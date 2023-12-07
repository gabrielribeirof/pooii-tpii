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
	phone: string;
	deliveryTime: number;
	address: string;
}

export default function CreateCarrier() {
	const { register, handleSubmit } = useForm<FormData>();

	async function onSubmit(data: FormData) {
		try {
			await api.post("/carriers", data);
			alert("Cadastrado com sucesso");
		} catch (error) {
			alert("Erro ao cadatrar");
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input {...register("code")} label="Código" required type="number" />

			<Input {...register("name")} label="Nome" required />

			<Input {...register("email")} label="E-mail" required />

			<Input {...register("cnpj")} label="CNPJ" required type="number" />

			<Input {...register("phone")} label="Telefone" required type="number" />

			<Input
				{...register("deliveryTime")}
				label="Tempo de entrega"
				type="number"
				required
			/>

			<Input {...register("address")} label="Endereço" required />

			<Button type="submit">Salvar</Button>
		</form>
	);
}
