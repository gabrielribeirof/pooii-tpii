import React from "react";
import { GameController } from "@phosphor-icons/react/dist/ssr";

import styles from "./sidebar.module.css";

export function Sidebar() {
	return (
		<aside className={styles.container}>
			<div className={styles.logoContainer}>LOGO</div>

			<nav className={styles.navContainer}>
				<div className={styles.navItem}>
					<GameController size={24} /> OI
				</div>
				<div className={styles.navItem}>OI</div>
				<div className={styles.navItem}>OI</div>
				<div className={styles.navItem}>OI</div>
				<div className={styles.navItem}>OI</div>
			</nav>
		</aside>
	);
}
