"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../../../page.module.css";
import { api } from "../../../../services/api";
import { parseDate } from "../../../../services/parseDate";
import { Card } from "../../../../components/Card";

import { MonthSelector } from "./monthSelector";

async function getSales(month: string) {
	const response = await api.get("sales/by-month", {
		params: {
			month,
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
	const [month, setMonth] = useState(params.month);

	const [data, setData] = useState<{
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
	const router = useRouter();

	useEffect(() => {
		async function loadSales() {
			const data = await getSales(params.month);

			setData(data);
		}

		void loadSales();
	}, [params.month]);

	return (
		<div className={styles.container}>
			<div>
				<h3>Lucro no mês: {data?.profit}</h3>

				<MonthSelector
					value={month}
					onChange={(value) => {
						router.push(`/sales/by-month/${value}`);
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
