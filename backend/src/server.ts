import express from "express";
import cors from "cors";

import { UserController } from "./controller/UserController";
import { GameController } from "./controller/GameController";
import { DeveloperController } from "./controller/DeveloperController";
import { CarrierController } from "./controller/CarrierController";
import { ReviewController } from "./controller/ReviewController";
import { EletronicGamesSystem } from "./model/EletronicGamesSystem";
import { Developer } from "./model/Developer";
import { SaleController } from "./controller/SaleController";
import { Carrier } from "./model/Carrier";

const app = express();

app.use(cors());
app.use(express.json());

// eslint-disable-next-line no-new
new EletronicGamesSystem("KBGames");

EletronicGamesSystem.developers.push(
	new Developer(123, "1", "1", "1", "1", "1", "1"),
);
EletronicGamesSystem.carriers.push(
	new Carrier(123, "1", "1", "1", "1", 1, "1"),
);

const userController = new UserController();
const gameController = new GameController();
const reviewController = new ReviewController();
const developerController = new DeveloperController();
const carrierController = new CarrierController();
const saleController = new SaleController();

app.post("/users/clients", userController.addClient);
app.post("/users/managers", userController.addManager);
app.post("/games", gameController.addGame);
app.post("/reviews", reviewController.addReview);
app.get("/games", gameController.gameListing);
app.get("/games/ordered", gameController.gameListingOrdered);
app.post("/developers", developerController.addDeveloper);
app.get("/developers", developerController.developerListing);
app.get(
	"/developers/by-more-sales",
	developerController.developerListingByMoreSales,
);
app.get("/developers/by-profit", developerController.developerListingByProfit);
app.post("/carriers", carrierController.addCarrier);
app.get("/carriers", carrierController.developerListing);
app.post("/sales", saleController.addSale);
app.get("/sales", saleController.saleListing);
app.get("/sales/by-payment", saleController.saleListingByPayment);
app.get("/sales/by-month", saleController.saleListingMonth);
app.get("/sales/by-month-per-dev", saleController.saleListingMonthDev);

app.use("*", (_, response) =>
	response.status(404).json({
		message: "Not Found",
	}),
);

app.listen(3001, () => {
	console.log("Backend rodando em http://localhost:3001");
});
