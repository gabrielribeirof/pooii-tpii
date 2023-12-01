import express from "express";

import { UserController } from "./controller/UserController";
import { GameController } from "./controller/GameController";
import { DeveloperController } from "./controller/DeveloperController";
import { CarrierController } from "./controller/CarrierController";
import { ReviewController } from "./controller/ReviewController";

const app = express();

const userController = new UserController();
const gameController = new GameController();
const reviewController = new ReviewController();
const developerController = new DeveloperController();
const carrierController = new CarrierController();

app.post("users/clients", userController.addClient);
app.post("users/managers", userController.addManager);
app.post("game/addGame", gameController.addGame);
app.post("game/addReview", reviewController.addReview);
app.put("game/listing", gameController.gameListing);
app.put("game/listingOrdered", gameController.gameListingOrdered);
app.post("developer/addDeveloper", developerController.addDeveloper);
app.put("developer/developerListing", developerController.developerListing);
app.put(
	"developer/developerListingByMoreSales",
	developerController.developerListingByMoreSales,
);
app.put(
	"developer/developerListingByProfit",
	developerController.developerListingByProfit,
);
app.put("/carrier", carrierController.addCarrier);

app.use("*", (_, response) =>
	response.status(404).send({ message: "Not Found" }),
);

app.listen(3001, () => {
	console.log("Backend rodando em http://localhost:3001");
});
