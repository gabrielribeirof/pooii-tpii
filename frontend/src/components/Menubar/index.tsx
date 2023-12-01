import React from "react";
import {
	Code,
	GameController,
	ShoppingBagOpen,
	Star,
	Truck,
	User,
	UserGear,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import * as NavigationMenu from "../RadixNavigationMenu";

import styles from "./menubar.module.css";

export function Menubar() {
	return (
		<div className={styles.container}>
			<div className={styles.logoContainer}>KBGames</div>

			<NavigationMenu.Root className={styles.navContainer}>
				<NavigationMenu.List className={styles.navList}>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger asChild>
							<div className={styles.navItem}>
								<GameController size={24} /> Jogos
							</div>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={styles.navItemContent}>
							<Link href="/users/create">Cadastrar jogo</Link>
							<Link href="/">Listar jogos</Link>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger asChild>
							<div className={styles.navItem}>
								<User size={24} /> Clientes
							</div>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={styles.navItemContent}>
							<Link href="/">Listar clientes</Link>
							<Link href="/">Top 10 clientes por nível</Link>
							<Link href="/">Cadastrar cliente</Link>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger asChild>
							<div className={styles.navItem}>
								<UserGear size={24} /> Gerentes
							</div>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={styles.navItemContent}>
							<Link href="/">Cadastrar gerente</Link>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger asChild>
							<div className={styles.navItem}>
								<Code size={24} /> Desenvolvedoras
							</div>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={styles.navItemContent}>
							<Link href="/developers/list">Listar desenvolvedoras</Link>
							<Link href="/developers/create">Cadastrar desenvolvedora</Link>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger asChild>
							<div className={styles.navItem}>
								<Truck size={24} /> Transportadora
							</div>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={styles.navItemContent}>
							<Link href="/">Listar transportadoras</Link>
							<Link href="/">Cadastrar transportadora</Link>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger asChild>
							<div className={styles.navItem}>
								<ShoppingBagOpen size={24} /> Vendas
							</div>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={styles.navItemContent}>
							<Link href="/">Listar vendas</Link>
							<Link href="/">Listar vendas por usuário</Link>
							<Link href="/">Listar vendas por desenvolvedora</Link>
							<Link href="/">Cadastrar venda</Link>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger asChild>
							<div className={styles.navItem}>
								<Star size={24} /> Avaliações
							</div>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={styles.navItemContent}>
							<Link href="/">Cadastrar avaliação</Link>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</div>
	);
}
