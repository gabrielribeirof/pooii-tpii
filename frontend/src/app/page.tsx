"use client";

import { useEffect, useState } from "react";

import { Card } from "../components/Card";
import { api } from "../services/api";
import { SelectInput } from "../components/SelectInput";

import styles from "./page.module.css";

async function getGames(gameType?: string) {
	const response = await api.get("/games", {
		params: {
			gameType,
		},
	});

	return response.data as Array<{
		_code: string;
		_name: string;
		_description: string;
		_developer: {
			_code: number;
			_cnpj: string;
			_name: string;
			_email: string;
			_site: string;
			_socialNetwork: string;
			_address: string;
		};
		_price: string;
		_note: number;
		_quantityReviews: number;
		taxRate: number;
	}>;
}

export default function Home() {
	const [data, setDate] = useState<
		Array<{
			_code: string;
			_name: string;
			_description: string;
			_developer: {
				_code: number;
				_cnpj: string;
				_name: string;
				_email: string;
				_site: string;
				_socialNetwork: string;
				_address: string;
			};
			_price: string;
			_note: number;
			_quantityReviews: number;
			taxRate: number;
		}>
	>();
	const [gameType, setGameType] = useState<string | undefined>("all");

	useEffect(() => {
		async function go() {
			const data = await getGames(gameType);

			setDate(data);
		}

		void go();
	}, [gameType]);

	return (
		<div className={styles.container}>
			<SelectInput
				value={gameType}
				onChange={(value) => {
					setGameType(value);

					async function go() {
						const data = await getGames(value);

						setDate(data);
					}

					void go();
				}}
				label="Selecione o tipo de jogo"
				options={[
					{ value: "action", label: "Ação" },
					{ value: "adventure", label: "Aventura" },
					{ value: "rpg", label: "RPG" },
					{ value: "running", label: "Corrida" },
					{ value: "sport", label: "Esporte" },
					{ value: "all", label: "Todos" },
				]}
				required
			/>

			{data?.map((value) => (
				<Card
					key={value._code}
					properties={[
						{ label: "Código", value: value._code.toString() },
						{ label: "Nome", value: value._name },
						{ label: "Descrição", value: value._description },
						{ label: "Desenvolvedora", value: value._developer._name },
						// { label: "Data de Lançamento", value: value._ },
						{ label: "Preço", value: value._price },
						{ label: "Nota", value: value._note.toString() },
						{
							label: "Quantidade de avaliações",
							value: value._quantityReviews.toString(),
						},
					]}
				/>
			))}
		</div>
	);
}
