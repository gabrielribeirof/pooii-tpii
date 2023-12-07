import styles from "../../page.module.css";
import { api } from "../../../services/api";
import { Card } from "../../../components/Card";
import { parseDate } from "../../../services/parseDate";

async function getSales() {
	const response = await api.get("/sales");

	console.log(response.data);

	return response.data as [
		{
			_code: number;
			_client: {
				_code: number;
				_name: string;
				_cpf: string;
				_rg: string;
				_birth: string;
				_address: string;
				_zipcode: string;
				_email: string;
				_registerDate: string;
				_level: number;
				_isEpic: false;
			};
			_manager: {
				_code: number;
				_name: string;
				_cpf: string;
				_rg: string;
				_birth: string;
				_address: string;
				_zipcode: string;
				_email: string;
				_salary: 1000;
				_pis: string;
				_admissionDate: string;
			};
			_dateSale: string;
			_dateDelivery: string;
			_carrier: {
				_code: 1;
				_cnpj: string;
				_name: string;
				_email: string;
				_phone: string;
				_deliveryTime: number;
				_address: string;
			};
			_payment: { _codeNote: string; _pixCode: string };
			_hasPhysicalProduct: true;
			_totalPrice: number;
			_priceDiscount: number;
			_saleItems: {_price: number, _quantity: number, _codeProduct: number}[] ;
		},
	];
}

export default async function ListSales() {
	const data = await getSales();

	return (
		<div className={styles.container}>
			{data?.map((value) => (
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
						{ label: "Jogos", value: value._saleItems[]._codeProduct },
					]}
				/>
			))}
		</div>
	);
}
