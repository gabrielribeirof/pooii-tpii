"use client";

import { useForm } from "react-hook-form";

import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { api } from "../../../services/api";

interface FormData {
	name: string;
	star: number;
	comment: string;
}

export default function CreateCarrier() {
	const { register, handleSubmit } = useForm<FormData>();

	async function onSubmit(data: FormData) {
		try {
			await api.post("/avaliable", data);
			alert("Cadastrado com sucesso");
		} catch (error) {
			alert("Erro ao cadatrar");
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input {...register("name")} label="Nome" required />

			<Input
				{...register("star")}
				label="Digite sua avaliação de 1 a 5"
				required
			/>

			<Input {...register("comment")} label="Comentário" required />

			<Button type="submit">Salvar</Button>
		</form>
	);
}
