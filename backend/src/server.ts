import express from "express";

import { UserController } from "./controller/UserController";

const app = express();

const userController = new UserController();

app.post("users/clients", userController.addClient);
app.post("users/managers", userController.addManager);

app.use("*", (_, response) =>
	response.status(404).send({ message: "Not Found" }),
);

app.listen(3000, () => {
	console.log("Backend rodando em http://localhost:3000");
});
