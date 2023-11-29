import express from "express";

import { UserController } from "./controller/UserController";
import { GameController } from "./controller/GameController";

const app = express();

const userController = new UserController();
const gameController = new GameController();

app.post("users/clients", userController.addClient);
app.post("users/managers", userController.addManager);
app.post("game/addGame", gameController.addGame);
app.post("game/evaluation", gameController.addEvaluation);
app.put("game/listing", gameController.gameListing);
app.put("game/listingOrdered", gameController.gameListingOrdered);

app.use("*", (_, response) =>
	response.status(404).send({ message: "Not Found" }),
);

app.listen(3000, () => {
	console.log("Backend rodando em http://localhost:3000");
});
