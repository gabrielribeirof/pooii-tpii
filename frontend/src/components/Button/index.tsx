import { type ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
	return (
		<button className={styles.container} {...props}>
			{children}
		</button>
	);
}
