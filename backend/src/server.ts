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

const app = express();

app.use(cors());
app.use(express.json());

// eslint-disable-next-line no-new
new EletronicGamesSystem("KBGames");
EletronicGamesSystem.developers.push(
	new Developer(123, "1", "1", "1", "1", "1", "1"),
);

const userController = new UserController();
const gameController = new GameController();
const reviewController = new ReviewController();
const developerController = new DeveloperController();
const carrierController = new CarrierController();
const saleController = new SaleController();

app.post("/users/clients", userController.addClient);
app.post("/users/managers", userController.addManager);
app.post("/game/addGame", gameController.addGame);
app.post("/game/addReview", reviewController.addReview);
app.put("/game/listing", gameController.gameListing);
app.put("/game/listingOrdered", gameController.gameListingOrdered);
app.post("/developer/addDeveloper", developerController.addDeveloper);
app.get("/developer/developerListing", developerController.developerListing);
app.put(
	"/developer/developerListingByMoreSales",
	developerController.developerListingByMoreSales,
);
app.put(
	"/developer/developerListingByProfit",
	developerController.developerListingByProfit,
);
app.put("/carrier", carrierController.addCarrier);
app.post("/sale/addSale", saleController.addSale);
app.put("/sale/listing", saleController.saleListing);
app.put("/sale/listingPayment", saleController.saleListingByPayment);
app.put("/sale/listingMonth", saleController.saleListingMonth);
app.put("/sale/listingMonthDev", saleController.saleListingMonthDev);

app.use("*", (_, response) =>
	response.status(404).json({
		message: "Not Found",
	}),
);

app.listen(3001, () => {
	console.log("Backend rodando em http://localhost:3001");
});
