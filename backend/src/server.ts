import fs from "fs";
import path from "path";

import express from "express";
import cors from "cors";

import UserController from "./controller/UserController";
import GameController from "./controller/GameController";
import DeveloperController from "./controller/DeveloperController";
import CarrierController from "./controller/CarrierController";
import ReviewController from "./controller/ReviewController";
import SaleController from "./controller/SaleController";
import { EletronicGamesSystem } from "./model/EletronicGamesSystem";
import { Developer } from "./model/Developer";
import { Carrier } from "./model/Carrier";
import { Manager } from "./model/Manager";
import { Client } from "./model/Client";
// import { Review } from "./model/Review";
import { Action } from "./model/Action";
import { Sale } from "./model/Sale";
import { Pix } from "./model/Pix";
import { SaleItem } from "./model/SaleItem";

const app = express();

app.use(cors());
app.use(express.json());

// eslint-disable-next-line no-new

function loadFromFile(): void {
	const data = fs.readFileSync("eletronicGamesSystem.json", "utf-8");

	if (!data) {
		return;
	}

	const obj = JSON.parse(data);
	EletronicGamesSystem.platformName = obj.platformName;
	EletronicGamesSystem.sales = obj.sales;
	EletronicGamesSystem.games = obj.games;
	EletronicGamesSystem.developers = obj.developers;
	EletronicGamesSystem.carriers = obj.carriers;
	EletronicGamesSystem.clients = obj.clients;
	EletronicGamesSystem.managers = obj.managers;
	EletronicGamesSystem.reviews = obj.reviews;
}

loadFromFile();

// eslint-disable-next-line no-new
new EletronicGamesSystem("KBGames");

// EletronicGamesSystem.developers.push(
// 	new Developer(
// 		1,
// 		"cnpj_rockstar",
// 		"Rockstar",
// 		"rockstar@rockstar.com",
// 		"rockstar.com",
// 		"rockstar",
// 		"Rua Endereço, 123",
// 	),
// );
// EletronicGamesSystem.games.push(
// 	new Action(
// 		1,
// 		"GTA 6",
// 		"Game 1",
// 		EletronicGamesSystem.developers[0],
// 		new Date(),
// 		100,
// 		"50",
// 		true,
// 	),
// );
// EletronicGamesSystem.carriers.push(
// 	new Carrier(
// 		1,
// 		"cnpj_correios",
// 		"Correios",
// 		"correios@correios.com",
// 		"(11) 99999 9999",
// 		10,
// 		"Rua Endereço, 123",
// 	),
// );
// EletronicGamesSystem.managers.push(
// 	new Manager(
// 		1,
// 		"João",
// 		"cpf_joao",
// 		"rg_joao",
// 		new Date("1990-01-01"),
// 		"Rua Endereço, 123",
// 		"12345678",
// 		"joao@email.com",
// 		1000,
// 		"123456789",
// 		new Date("2021-01-01"),
// 	),
// );
// EletronicGamesSystem.clients.push(
// 	new Client(
// 		1,
// 		"Maria",
// 		"cpf_maria",
// 		"rg_maria",
// 		new Date("1990-01-01"),
// 		"Rua Endereço, 123",
// 		"12345678",
// 		"maria@email.com",
// 		new Date("2021-01-01"),
// 		true,
// 	),
// );
// /* EletronicGamesSystem.reviews.push(
// 	new Review(
// 		5,
// 		"Comentário 1",
// 		EletronicGamesSystem.clients[0],
// 		EletronicGamesSystem.games[0],
// 	),
// ); */
// const s = new Sale(
// 	1,
// 	EletronicGamesSystem.clients[0],
// 	EletronicGamesSystem.managers[0],
// 	new Date(),
// 	true,
// 	new Pix("1"),
// 	EletronicGamesSystem.carriers[0],
// );
// s.addSaleItem(new SaleItem(1, 1));
// EletronicGamesSystem.sales.push(s);

app.post("/users/clients", UserController.addClient);
app.post("/users/managers", UserController.addManager);
app.get("/users", (req, res) => {
	UserController.userListing(req, res);
});
app.post("/games", GameController.addGame);
app.post("/reviews", ReviewController.addReview);
app.get("/reviews", ReviewController.ReviewListing);
app.get("/games", (req, res) => {
	GameController.gameListing(req, res);
});
app.get("/games/ordered", (req, res) => {
	GameController.gameListingOrdered(req, res);
});
app.post("/developers", DeveloperController.addDeveloper);
app.get("/developers", DeveloperController.developerListing);
app.get(
	"/developers/by-more-sales",
	DeveloperController.developerListingByMoreSales,
);
app.get("/developers/by-profit", DeveloperController.developerListingByProfit);
app.post("/carriers", CarrierController.addCarrier);
app.get("/carriers", CarrierController.developerListing);
app.post("/sales", SaleController.addSale);
app.get("/sales", (req, res) => {
	SaleController.saleListing(req, res);
});
app.get("/sales/by-payment", (req, res) => {
	SaleController.saleListingByPayment(req, res);
});
app.get("/sales/by-month", SaleController.saleListingMonth);
app.get("/sales/by-month-per-dev", SaleController.saleListingMonthDev);
app.get("/sales/by-clients", SaleController.saleListingByClient);

app.use("*", (_, response) =>
	response.status(404).json({
		message: "Not Found",
	}),
);

app.listen(3003, () => {
	console.log("Backend rodando em http://localhost:3003");
});

const save = (): void => {
	fs.writeFile(
		path.join(".", "eletronicGamesSystem.json"),
		EletronicGamesSystem.toJson,
		(err) => {
			if (err) throw err;
			console.log("Saved!");
		},
	);
};

process.on("SIGINT", save);

process.on("exit", save);
