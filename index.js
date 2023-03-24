import process from "node:process";
import express from "express";
import { isEmpty } from "lodash-es";
import { observable, publish } from "./utils/observable.js";
import { publicKey, deriveSecretKey, encrypt } from "./utils/crypto.js";

const store = { votes: {}, startTime: 0, timeTaken: 0 };

const app = express();
app.use(express.json());
app.use(express.static(new URL("client/dist", import.meta.url).pathname));

if (process.env.NODE_ENV === "dev") {
	const { default: cors } = await import("cors");
	app.use(cors());
}

app.post("/api/:id/vote", (request, response) => {
	const { vote } = request.body;
	const id = request.params.id;
	store.votes[id].vote = vote;

	if (Object.values(store.votes).every(({ vote }) => vote !== "?")) {
		store.timeTaken = new Date(Date.now() - store.startTime).setMilliseconds(0);
	}

	publish(store);
	response.sendStatus(200);
});

app.delete("/api/vote", (request, response) => {
	for (const id of Object.keys(store.votes)) {
		store.votes[id].vote = "?";
	}

	store.startTime = Date.now();
	store.timeTaken = 0;

	publish(store);
	response.sendStatus(200);
});

app.post("/api/:id/name", (request, response) => {
	const { newName } = request.body;
	const id = request.params.id;
	store.votes[id].name = newName;
	publish(store);

	response.send({ newName });
});

app.delete("/api/:name", (request, response) => {
	const name = request.params.name;
	const id = Object.keys(store.votes).find(
		(playerId) => store.votes[playerId].name === name
	);
	delete store.votes[id];
	publish(store);

	response.sendStatus(200);
});

app.get("/api/events/:id/:name/:clientPublicKey", async (request, response) => {
	response.writeHead(200, {
		"Content-Type": "text/event-stream",
		Connection: "keep-alive",
		"Cache-Control": "no-cache",
	});

	response.write("retry: 10000\n\n");

	response.write(`event:key\ndata: ${JSON.stringify(publicKey)}\n\n`);

	const clientPublicKey = request.params.clientPublicKey;
	const secretKey = await deriveSecretKey(decodeURI(clientPublicKey));

	const func = async (data) => {
		const encryptedData = await encrypt(secretKey, data);
		response.write(`data: ${encryptedData}\n\n`);
	};

	const unsubscribe = observable.subscribe(func);

	if (isEmpty(store.votes)) {
		store.startTime = Date.now();
		store.timeTaken = 0;
	}

	const id = request.params.id;
	store.votes[id] = { name: request.params.name, vote: "?" };
	publish(store);

	console.log("Connection established");

	request.on("close", () => {
		unsubscribe();
		delete store.votes[id];
		publish(store);
		console.log("Connection closed");
	});
});

app.get("*", (request, response) => {
	response.sendFile(
		new URL("client/dist/index.html", import.meta.url).pathname
	);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
