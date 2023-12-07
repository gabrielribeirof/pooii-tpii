"use client";

import { useEffect, useState } from "react";

import styles from "../../page.module.css";
import { api } from "../../../services/api";
import { Card } from "../../../components/Card";
import { SelectInput } from "../../../components/SelectInput";

async function getGames(sortType?: string) {
	if (!sortType) return;

	const response = await api.get("games/ordered", {
		params: {
			sortType,
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

export default function ListSales() {
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
	const [sortType, setSortType] = useState<string | undefined>(undefined);
	const [sortTypeOptions, setClientOptions] = useState<
		Array<{ label: string; value: string }> | undefined
	>(undefined);

	useEffect(() => {
		async function go1() {
			const response = await api.get<Array<{ _name: string; _code: string }>>(
				"users",
				{
					params: {
						userType: "client",
					},
				},
			);

			setClientOptions(
				response.data.map((value) => ({
					label: value._name,
					value: String(value._code),
				})),
			);
		}

		void go1();
	}, []);

	useEffect(() => {
		async function go() {
			const games = await getGames(sortType);

			setDate(games);
		}

		void go();
	}, [sortType]);

	return (
		<div className={styles.container}>
			<div>
				<SelectInput
					value={sortType}
					onChange={(value) => {
						async function go() {
							const sales = await getGames(sortType);

							setDate(sales);
						}

						void go();
						setSortType(value);
					}}
					label="Selecionar algoritmo de ordenação"
					isLoading={!sortTypeOptions}
					options={[
						{ label: "Quicksort", value: "quicksort" },
						{ label: "Bubblesort", value: "bubblesort" },
						{ label: "Expensive", value: "expensive" },
						{ label: "Cheap", value: "cheap" },
					]}
				/>
			</div>

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
