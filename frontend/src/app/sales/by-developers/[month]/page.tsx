"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../../../page.module.css";
import { api } from "../../../../services/api";
import { parseDate } from "../../../../services/parseDate";
import { Card } from "../../../../components/Card";
import { SelectInput } from "../../../../components/SelectInput";

import { MonthSelector } from "./monthSelector";

async function getSales(month: string, developerCode?: string) {
	if (!developerCode || !month) return;

	const response = await api.get("sales/by-month-per-dev", {
		params: {
			month,
			developerCode,
		},
	});

	return response.data as {
		salesMonth: Array<{
			_code: number;
			_client: { _name: string };
			_manager: { _name: string };
			_dateSale: string;
			_dateDelivery: string;
			_carrier: { _name: string };
			_hasPhysicalProduct: boolean;
			_totalPrice: number;
			_priceDiscount: number;
			_saleItems: Array<{
				_quantity: number;
				_codeProduct: number;
				_price: number;
			}>;
		}>;
		profit: number;
	};
}

export default function ListSales({
	params,
}: {
	params: {
		month: string;
	};
}) {
	const [data, setDate] = useState<{
		salesMonth: Array<{
			_code: number;
			_client: { _name: string };
			_manager: { _name: string };
			_dateSale: string;
			_dateDelivery: string;
			_carrier: { _name: string };
			_hasPhysicalProduct: boolean;
			_totalPrice: number;
			_priceDiscount: number;
			_saleItems: Array<{
				_quantity: number;
				_codeProduct: number;
				_price: number;
			}>;
		}>;
		profit: number;
	}>();
	const [developerCode, setDeveloperCode] = useState<string | undefined>(
		undefined,
	);
	const [developerOptions, setDeveloperOptions] = useState<
		Array<{ label: string; value: string }> | undefined
	>(undefined);
	const [month, setMonth] = useState(params.month);
	const router = useRouter();

	useEffect(() => {
		async function go1() {
			const response =
				await api.get<Array<{ _name: string; _code: string }>>("developers");

			setDeveloperOptions(
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
			const sales = await getSales(params.month, developerCode);

			setDate(sales);
		}

		void go();
	}, [developerCode, developerOptions, params]);

	return (
		<div className={styles.container}>
			<div>
				<h3>
					Lucro no mês: {data ? data.profit : "Selecione uma desenvolvedora"}
				</h3>

				<SelectInput
					value={developerCode}
					onChange={(value) => {
						async function go() {
							const sales = await getSales(params.month, developerCode);

							setDate(sales);
						}

						void go();
						setDeveloperCode(value);
					}}
					label="Selecionar desenvolvedora"
					isLoading={!developerOptions}
					options={developerOptions}
				/>

				<MonthSelector
					monthSelect={params.month}
					value={month}
					onChange={(value) => {
						router.push(`/sales/by-developers/${value}`);
						setMonth(String(value));
					}}
				/>
			</div>

			{data?.salesMonth.map((value) => {
				const games = value._saleItems.map((value, index) => ({
					label: `Jogo ${index + 1}`,
					withoutLabel: true,
					value: `Código: ${value._codeProduct} | Quantidade: ${value._quantity} | Preço: ${value._price}`,
				}));

				return (
					<Card
						key={value._code}
						properties={[
							{ label: "Cliente", value: value._client._name },
							{ label: "Gerente", value: value._manager._name },
							{
								label: "Data da venda",
								value: parseDate(new Date(value._dateSale)),
							},
							{ label: "Transportadora", value: value._carrier._name },
							{
								label: "Data da entrega",
								value: parseDate(new Date(value._dateDelivery)),
							},
							{
								label: "Valor da compra",
								value: value._priceDiscount.toString(),
							},
							{
								label: ":::Jogos::",
								value: "",
							},
							...games,
						]}
					/>
				);
			})}
		</div>
	);
}
