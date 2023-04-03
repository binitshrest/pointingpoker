import process from "node:process";
import express from "express";
import { isEmpty } from "lodash-es";
import { observable, publish } from "./utils/observable.js";
import { publicKey, deriveSecretKey, encrypt } from "./utils/crypto.js";

const store = {
	votes: {},
	startTime: 0,
	timeTaken: 0,
	voteOptions: [
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		[0.5, 1, 2, 3, 5, 8, 13, 21],
	],
	selectedVoteOptionsIndex: 0,
	closeConnection: {},
	toJSON() {
		const { closeConnection, ...storeCopy } = this;
		return storeCopy;
	},
};

const app = express();
app.use(express.json());
app.use(express.static(new URL("client/dist", import.meta.url).pathname));

if (process.env.NODE_ENV === "dev") {
	try {
		const { default: cors } = await import("cors");
		app.use(cors());
	} catch (error) {
		console.log("Error while importing cors", error);
		throw error;
	}
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
	store.closeConnection[id]();

	response.sendStatus(200);
});

app.post("/api/vote-options-index", (request, response) => {
	const { selectedVoteOptionsIndex } = request.body;
	store.selectedVoteOptionsIndex = selectedVoteOptionsIndex;
	publish(store);

	response.send({ selectedVoteOptionsIndex });
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
	let secretKey;

	try {
		secretKey = await deriveSecretKey(decodeURI(clientPublicKey));
	} catch (error) {
		console.log("Error while subscribing to event stream", error);
		response.end();
		throw error;
	}

	const sendEvent = async (data) => {
		try {
			const encryptedData = await encrypt(secretKey, data);
			response.write(`data: ${encryptedData}\n\n`);
		} catch (error) {
			console.log("Error while writing data to event stream", error);
			response.end();
		}
	};

	const unsubscribe = observable.subscribe(sendEvent);

	if (isEmpty(store.votes)) {
		store.startTime = Date.now();
		store.timeTaken = 0;
	}

	const id = request.params.id;
	const name = request.params.name;
	store.votes[id] = { name, vote: "?" };
	store.closeConnection[id] = () => response.end();
	publish(store);

	console.log(`Connection established to ${id} ${name}`);

	request.on("close", () => {
		unsubscribe();
		delete store.votes[id];
		publish(store);
		console.log(`Connection closed to ${id} ${name}`);
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
