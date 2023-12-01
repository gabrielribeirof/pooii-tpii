import Image from "next/image";

import styles from "./card.module.css";

interface CardProps {
	imageSrc?: string;
	properties: Array<{ label: string; value: string }>;
}

export function Card(props: CardProps) {
	return (
		<div className={styles.container}>
			{props.imageSrc && (
				<Image
					src="https://uploads.jovemnerd.com.br/wp-content/uploads/2023/02/super_mario_bros_filme_poster__ft7003.jpeg"
					alt="image"
					width={1210}
					height={544}
				/>
			)}

			{props.properties.map((property) => (
				<div key={property.label} className={styles.info}>
					<label>{property.label}: </label>

					<span>{property.value}</span>
				</div>
			))}
		</div>
	);
}
