import express from "express";

const app = express();

app.use("*", (_, response) =>
	response.status(404).send({ message: "Not Found" }),
);

app.listen(3000, () => {
	console.log("Backend rodando em http://localhost:3000");
});
