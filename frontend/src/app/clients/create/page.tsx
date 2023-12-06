"use client";

import { Controller, useForm } from "react-hook-form";

import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { api } from "../../../services/api";
import { SelectInput } from "../../../components/SelectInput";

interface FormData {
	code: number;
	name: string;
	email: string;
	cpf: string;
	rg: string;
	birth: string;
	address: string;
	isEpic: string;
}

export default function CreateClients() {
	const { control, register, handleSubmit } = useForm<FormData>();

	async function onSubmit(data: FormData) {
		try {
			await api.post("/users/clients", data);
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

			<Controller
				name="isEpic"
				control={control}
				render={({ field }) => (
					<SelectInput
						value={field.value}
						onChange={field.onChange}
						label="É épico?"
						options={[
							{ value: "true", label: "Sim" },
							{ value: "false", label: "Não" },
						]}
						required
					/>
				)}
			/>

			<Button type="submit">Salvar</Button>
		</form>
	);
}
