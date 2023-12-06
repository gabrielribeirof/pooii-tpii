"use client";

import { useForm } from "react-hook-form";

import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { api } from "../../../services/api";

interface FormData {
	code: number;
	name: string;
	email: string;
	cpf: string;
	rg: string;
	birth: string;
	address: string;
	zipcode: string;
	salary: string;
	pis: string;
	admissionDate: string;
}

export default function CreateManager() {
	const { register, handleSubmit } = useForm<FormData>();

	async function onSubmit(data: FormData) {
		try {
			await api.post("/users/managers", data);
			alert("Cadastrado com sucesso");
		} catch (error) {
			alert("Erro ao cadatrar");
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input {...register("code")} label="Código" required />

			<Input {...register("name")} label="Nome" required />

			<Input {...register("email")} label="E-mail" required />

			<Input {...register("cpf")} label="CPF" required />

			<Input {...register("rg")} label="RG" required />

			<Input
				{...register("birth")}
				label="Data de nascimento"
				type="date"
				required
			/>

			<Input {...register("address")} label="Endereço" required />

			<Input {...register("zipcode")} label="CEP" required />

			<Input {...register("salary")} label="Salário" type="number" required />

			<Input {...register("pis")} label="PIS" required />

			<Input
				{...register("admissionDate")}
				label="Data de admissão"
				type="date"
				required
			/>

			<Button type="submit">Salvar</Button>
		</form>
	);
}
