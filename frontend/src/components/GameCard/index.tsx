import Image from "next/image";

import styles from "./game-card.module.css";

interface GameCardProps {
	name: string;
	description: string;
	developerName: string;
	price: number;
}

export function GameCard(props: GameCardProps) {
	return (
		<div className={styles.container}>
			<Image
				src="https://uploads.jovemnerd.com.br/wp-content/uploads/2023/02/super_mario_bros_filme_poster__ft7003.jpeg"
				alt="image"
				width={1210}
				height={544}
			/>

			<div className={styles.info}>
				<label>Nome: </label>

				<span>{props.name}</span>
			</div>

			<div className={styles.info}>
				<label>Descrição: </label>

				<span>{props.description}</span>
			</div>

			<div className={styles.info}>
				<label>Desenvolvedora: </label>

				<span>{props.developerName}</span>
			</div>

			<div className={styles.info}>
				<label>Preço: </label>

				<span>R$ {props.price.toFixed(2).replace(".", ",")}</span>
			</div>
		</div>
	);
}
