"use client";

import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { api } from "../../../services/api";
import { SelectInput } from "../../../components/SelectInput";

interface FormData {
	note: number;
	comment: string;
	clientCode: string;
	gameCode: string;
}

export default function CreateReview() {
	const [clientOptions, setClientOptions] = useState<
		Array<{ label: string; value: string }> | undefined
	>(undefined);
	const [gameOptions, setGameOptions] = useState<
		Array<{ label: string; value: string }> | undefined
	>(undefined);

	useEffect(() => {
		async function go() {
			const response = await api.get<Array<{ _name: string; _code: number }>>(
				"/users",
				{
					params: {
						userType: "client",
					},
				},
			);

			setClientOptions(
				response.data.map((developer) => ({
					label: developer._name,
					value: String(developer._code),
				})),
			);
		}

		async function go2() {
			const response =
				await api.get<Array<{ _name: string; _code: number }>>("games");

			console.log(response.data);
			setGameOptions(
				response.data.map((developer) => ({
					label: developer._name,
					value: String(developer._code),
				})),
			);
		}

		void go();
		void go2();
	}, []);

	const { register, handleSubmit, control } = useForm<FormData>();

	async function onSubmit(data: FormData) {
		try {
			await api.post("/reviews", data);
			alert("Cadastrado com sucesso");
		} catch (error) {
			alert("Erro ao cadatrar");
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input {...register("note")} label="Nota" required />

			<Input {...register("comment")} label="Comentário" required />

			<Controller
				name="clientCode"
				control={control}
				render={({ field }) => (
					<SelectInput
						value={field.value}
						onChange={field.onChange}
						label="Cliente"
						options={clientOptions}
						isLoading={!clientOptions}
						required
					/>
				)}
			/>

			<Controller
				name="gameCode"
				control={control}
				render={({ field }) => (
					<SelectInput
						value={field.value}
						onChange={field.onChange}
						label="Jogo"
						options={gameOptions}
						isLoading={!gameOptions}
						required
					/>
				)}
			/>

			<Button type="submit">Salvar</Button>
		</form>
	);
}
