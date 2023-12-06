"use client";

import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { SelectInput } from "../../../components/SelectInput";
import { api } from "../../../services/api";

interface FormData {
	code: string;
	gameType: string;
	name: string;
	description: string;
	developer: string;
	price: string;
	available: string;
}

export default function CreateUser() {
	const { control, register, handleSubmit } = useForm<FormData>();
	const [developerOptions, setDeveloperOptions] = useState<
		Array<{ label: string; value: string }> | undefined
	>(undefined);

	useEffect(() => {
		async function go() {
			const response = await api.get<Array<{ _name: string; _code: number }>>(
				"developer/developerListing",
			);

			setDeveloperOptions(
				response.data.map((developer) => ({
					label: developer._name,
					value: String(developer._code),
				})),
			);
		}

		void go();
	}, []);

	function onSubmit(data: FormData) {
		console.log(data);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input {...register("code")} label="Code" required />

			<Controller
				name="gameType"
				control={control}
				render={({ field }) => (
					<SelectInput
						value={field.value}
						onChange={field.onChange}
						label="Type"
						options={[
							{ value: "action", label: "Ação" },
							{ value: "adventure", label: "Aventura" },
							{ value: "rpg", label: "RPG" },
							{ value: "sport", label: "Esporte" },
							{ value: "running", label: "Corrida" },
						]}
						required
					/>
				)}
			/>

			<Input {...register("name")} label="Name" required />

			<Input {...register("description")} label="Description" required />

			<Controller
				name="developer"
				control={control}
				render={({ field }) => (
					<SelectInput
						value={field.value}
						onChange={field.onChange}
						label="Desenvolvedora"
						options={developerOptions}
						isLoading={!developerOptions}
						required
					/>
				)}
			/>

			<Input
				{...register("price")}
				label="Preço"
				type="number"
				min={0.1}
				step={0.1}
				required
			/>

			<Controller
				name="available"
				control={control}
				render={({ field }) => (
					<SelectInput
						value={field.value}
						onChange={field.onChange}
						label="Disponível"
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
