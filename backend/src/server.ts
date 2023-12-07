import express from "express";
import cors from "cors";

import UserController from "./controller/UserController";
import GameController from "./controller/GameController";
import DeveloperController from "./controller/DeveloperController";
import CarrierController from "./controller/CarrierController";
import ReviewController from "./controller/ReviewController";
import SaleController from "./controller/SaleController";
import {EletronicGamesSystem} from "./model/EletronicGamesSystem";
import { Developer } from "./model/Developer";
import { Carrier } from "./model/Carrier";
import { Manager } from "./model/Manager";
import { Client } from "./model/Client";
// import { Review } from "./model/Review";
import { Action } from "./model/Action";
import { Sale } from "./model/Sale";
import { Pix } from "./model/Pix";
import { SaleItem } from "./model/SaleItem";
import { Adventure } from "./model/Adventure";
import { Review } from "./model/Review"

const app = express();

app.use(cors());
app.use(express.json());

// eslint-disable-next-line no-new
new EletronicGamesSystem("KBGames");

// eslint-disable-next-line no-new

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

app.listen(3006, () => {
	console.log("Backend rodando em http://localhost:3006");
});
