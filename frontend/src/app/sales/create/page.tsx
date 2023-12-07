"use client";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { api } from "../../../services/api";
import { SelectInput } from "../../../components/SelectInput";

interface FormData {
	code: string;
	clientCode: string;
	managerCode: string;
	carrierCode: string;
	dateSale: string;
	hasPhysicalProduct: string;
	saleItems: Array<{
		name: string;
		quantity: number;
		codeProduct: number;
	}>;

	payment:
		| { codeNote: string; pixCode: string }
		| {
				codeNote: string;
				flag: string;
				name: string;
				number: string;
		  }
		| { codeNote: string; number: string };
}

export default function CreateSlae() {
	const [clientOptions, setClientOptions] = useState<
		Array<{ label: string; value: string }> | undefined
	>(undefined);
	const [managerOptions, setManagerOptions] = useState<
		Array<{ label: string; value: string }> | undefined
	>(undefined);
	const [carrierOptions, setCarrierOptions] = useState<
		Array<{ label: string; value: string }> | undefined
	>(undefined);

	const { register, handleSubmit, control } = useForm<FormData>();
	const { fields, replace } = useFieldArray({
		control,
		name: "saleItems",
	});

	const [paymentType, setPaymentType] = useState<
		undefined | "pix" | "card" | "receipt"
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

			replace(
				response.data.map((game) => ({
					name: game._name,
					codeProduct: game._code,
					quantity: 0,
				})),
			);
		}

		async function go3() {
			const response =
				await api.get<Array<{ _name: string; _code: number }>>("carriers");

			setCarrierOptions(
				response.data.map((developer) => ({
					label: developer._name,
					value: String(developer._code),
				})),
			);
		}

		async function go4() {
			const response = await api.get<Array<{ _name: string; _code: number }>>(
				"/users",
				{
					params: {
						userType: "manager",
					},
				},
			);

			setManagerOptions(
				response.data.map((developer) => ({
					label: developer._name,
					value: String(developer._code),
				})),
			);
		}

		void go();
		void go2();
		void go3();
		void go4();
	}, [replace]);

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
			<Input {...register("code")} label="Código" type="number" required />

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
				name="managerCode"
				control={control}
				render={({ field }) => (
					<SelectInput
						value={field.value}
						onChange={field.onChange}
						label="Gerente"
						options={managerOptions}
						isLoading={!managerOptions}
						required
					/>
				)}
			/>

			<Controller
				name="carrierCode"
				control={control}
				render={({ field }) => (
					<SelectInput
						value={field.value}
						onChange={field.onChange}
						label="Transportadora"
						options={carrierOptions}
						isLoading={!carrierOptions}
						required
					/>
				)}
			/>

			<Input
				{...register("dateSale")}
				label="Data da venda"
				type="date"
				required
			/>

			<Controller
				name="hasPhysicalProduct"
				control={control}
				render={({ field }) => (
					<SelectInput
						value={field.value}
						onChange={field.onChange}
						label="Tem produto físico?"
						options={[
							{ value: "true", label: "Sim" },
							{ value: "false", label: "Não" },
						]}
						required
					/>
				)}
			/>

			<h2>Pagamento</h2>

			<SelectInput
				value={paymentType}
				label="Tem produto físico?"
				options={[
					{ value: "pix", label: "Pix" },
					{ value: "card", label: "Card" },
					{ value: "card", label: "Card" },
				]}
				required
			/>

			<h2>Jogos da venda</h2>

			{fields.map((field, index) => (
				<>
					<Input
						key={field.id}
						label={field.name}
						{...register(`saleItems.${index}.quantity`)}
					/>
				</>
			))}

			<Button type="submit">Salvar</Button>
		</form>
	);
}
