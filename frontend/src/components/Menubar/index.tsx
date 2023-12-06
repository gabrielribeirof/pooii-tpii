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
			<NavigationMenu.Root className={styles.navContainer}>
				<NavigationMenu.List className={styles.navList}>
					<NavigationMenu.Item>
						<NavigationMenu.Trigger asChild>
							<div className={styles.navItem}>
								<GameController size={24} /> Jogos
							</div>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={styles.navItemContent}>
							<Link href="/games/create">Cadastrar jogo</Link>
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
							<Link href="/clients/all">Listar clientes</Link>
							<Link href="/clients/epic">Listar clientes épicos</Link>
							<Link href="/clients/level">Top 10 clientes por nível</Link>
							<Link href="/clients/create">Cadastrar cliente</Link>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger asChild>
							<div className={styles.navItem}>
								<UserGear size={24} /> Gerentes
							</div>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={styles.navItemContent}>
							<Link href="/managers/list">Listar gerentes</Link>
							<Link href="/managers/create">Cadastrar gerente</Link>
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
							<Link href="/carriers/list">Listar transportadoras</Link>
							<Link href="/carriers/create">Cadastrar transportadora</Link>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger asChild>
							<div className={styles.navItem}>
								<ShoppingBagOpen size={24} /> Vendas
							</div>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={styles.navItemContent}>
							<Link href="/sales/list">Listar vendas</Link>
							<Link href="/sales/list-by-users">Listar vendas por usuário</Link>
							<Link href="/sales/list-by-developers">
								Listar vendas por desenvolvedora
							</Link>
							<Link href="/sales/create">Cadastrar venda</Link>
						</NavigationMenu.Content>
					</NavigationMenu.Item>

					<NavigationMenu.Item>
						<NavigationMenu.Trigger asChild>
							<div className={styles.navItem}>
								<Star size={24} /> Avaliações
							</div>
						</NavigationMenu.Trigger>

						<NavigationMenu.Content className={styles.navItemContent}>
							<Link href="/reviews/list">Listar avaliações</Link>
							<Link href="/reviews/create">Cadastrar avaliação</Link>
						</NavigationMenu.Content>
					</NavigationMenu.Item>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</div>
	);
}
