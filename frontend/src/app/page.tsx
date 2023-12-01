import { Card } from "../components/Card";

import styles from "./page.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			{Array(10)
				.fill(0)
				.map((value) => (
					<Card
						key={value}
						imageSrc="s"
						properties={[
							{ label: "Name", value: "Oi" },
							{
								label: "Descrição",
								value:
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus porttitor consectetur. Suspendisse auctor lacinia nisl, sed malesuada nunc auctor non",
							},
							{
								label: "Desenvolvedora",
								value: "Rockstar",
							},
							{
								label: "Preço",
								value: "R$ 20,00",
							},
						]}
					/>
				))}
		</div>
	);
}
