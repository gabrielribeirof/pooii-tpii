import React, { type InputHTMLAttributes } from "react";

import styles from "./input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	function Input({ label, ...props }, ref) {
		return (
			<div className={styles.container}>
				<label>{label}</label>

				<input ref={ref} {...props} />
			</div>
		);
	},
);
