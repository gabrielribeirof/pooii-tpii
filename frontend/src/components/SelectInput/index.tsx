import React from "react";
import {
	ArrowUp,
	CaretDown,
	CaretUp,
	Check,
	Spinner,
} from "@phosphor-icons/react";

import * as Select from "../RadixSelect";

import styles from "./select-input.module.css";

interface SelectInputProps {
	label: string;
	options?: Array<{
		label: string;
		value: string;
	}>;
	value: string | undefined;
	onChange: (value: string | undefined) => void;
	required?: boolean;
	isLoading?: boolean;
}

export function SelectInput({
	label,
	options,
	value,
	onChange,
	required,
	isLoading,
}: SelectInputProps) {
	return (
		<div className={styles.container}>
			<label>{label}</label>

			<Select.Root
				disabled={options === undefined}
				value={value}
				onValueChange={onChange}
				required={required}
			>
				<Select.Trigger>
					<Select.Value
						placeholder={
							isLoading ? (
								<Spinner className={styles.spinner} />
							) : (
								"Selecione uma opção"
							)
						}
					/>

					<Select.Icon>
						<CaretDown />
					</Select.Icon>
				</Select.Trigger>

				<Select.Portal>
					<Select.Content className={styles.content}>
						<Select.ScrollUpButton>
							<ArrowUp />
						</Select.ScrollUpButton>

						<Select.Viewport>
							{options?.map((option) => (
								<Select.Item
									key={option.value}
									value={option.value}
									className={styles.item}
								>
									<Select.ItemText>{option.label}</Select.ItemText>

									<Select.ItemIndicator>
										<Check />
									</Select.ItemIndicator>
								</Select.Item>
							))}
						</Select.Viewport>

						<Select.ScrollDownButton className="SelectScrollButton">
							<CaretUp />
						</Select.ScrollDownButton>
					</Select.Content>
				</Select.Portal>
			</Select.Root>
		</div>
	);
}
