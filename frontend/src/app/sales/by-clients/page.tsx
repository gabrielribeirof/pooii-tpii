"use client";

import { useEffect, useState } from "react";

import styles from "../../page.module.css";
import { api } from "../../../services/api";
import { parseDate } from "../../../services/parseDate";
import { Card } from "../../../components/Card";
import { SelectInput } from "../../../components/SelectInput";

async function getSales(clientCode?: string) {
	if (!clientCode) return;

	const response = await api.get("sales/by-clients", {
		params: {
			clientCode,
		},
	});

	console.log(response.data);

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

export default function ListSales() {
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
	const [clientCode, setClientCode] = useState<string | undefined>(undefined);
	const [clientOptions, setClientOptions] = useState<
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
			const sales = await getSales(clientCode);

			setDate(sales);
		}

		void go();
	}, [clientCode]);

	return (
		<div className={styles.container}>
			<div>
				<h3>
					Lucro no mês: {data ? data.profit : "Selecione uma desenvolvedora"}
				</h3>

				<SelectInput
					value={clientCode}
					onChange={(value) => {
						async function go() {
							const sales = await getSales(clientCode);

							setDate(sales);
						}

						void go();
						setClientCode(value);
					}}
					label="Selecionar cliente"
					isLoading={!clientOptions}
					options={clientOptions}
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
