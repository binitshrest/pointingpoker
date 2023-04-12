import process from "node:process";
import express from "express";
import { cloneDeep, isEmpty } from "lodash-es";
import { Observable } from "./utils/observable.js";
import { publicKey, deriveSecretKey, encrypt } from "./utils/crypto.js";

const roomTemplate = {
	votes: {},
	startTime: 0,
	timeTaken: 0,
	voteOptions: [
		[0.5, 1, 2, 3, 5, 8, 13, 20, 40],
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	],
	selectedVoteOptionsIndex: 0,
};

const observables = {};
const store = {};
const closeConnection = {};

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

app.post("/api/:roomId/:id/vote", (request, response) => {
	const { vote } = request.body;
	const { id, roomId } = request.params;
	store[roomId].votes[id].vote = vote;

	if (Object.values(store[roomId].votes).every(({ vote }) => vote !== "?")) {
		store[roomId].timeTaken = new Date(
			Date.now() - store[roomId].startTime
		).setMilliseconds(0);
	}

	observables[roomId].publish(store[roomId]);
	response.sendStatus(200);
});

app.delete("/api/:roomId/vote", (request, response) => {
	const { roomId } = request.params;
	for (const id of Object.keys(store[roomId].votes)) {
		store[roomId].votes[id].vote = "?";
	}

	store[roomId].startTime = Date.now();
	store[roomId].timeTaken = 0;

	observables[roomId].publish(store[roomId]);
	response.sendStatus(200);
});

app.post("/api/:roomId/:id/name", (request, response) => {
	const { name } = request.body;
	const { id, roomId } = request.params;
	store[roomId].votes[id].name = name;
	observables[roomId].publish(store[roomId]);

	response.sendStatus(200);
});

app.delete("/api/:roomId/:name", (request, response) => {
	const { name, roomId } = request.params;
	const id = Object.keys(store[roomId].votes).find(
		(playerId) => store[roomId].votes[playerId].name === name
	);
	closeConnection[id]();

	response.sendStatus(200);
});

app.post("/api/:roomId/vote-options-index", (request, response) => {
	const { roomId } = request.params;
	const { selectedVoteOptionsIndex } = request.body;
	store[roomId].selectedVoteOptionsIndex = selectedVoteOptionsIndex;
	observables[roomId].publish(store[roomId]);

	response.send({ selectedVoteOptionsIndex });
});

app.get(
	"/api/events/:roomId/:id/:name/:clientPublicKey",
	async (request, response) => {
		response.writeHead(200, {
			"Content-Type": "text/event-stream",
			Connection: "keep-alive",
			"Cache-Control": "no-cache",
		});

		response.write("retry: 10000\n\n");

		response.write(`event:key\ndata: ${JSON.stringify(publicKey)}\n\n`);

		const { id, name, roomId, clientPublicKey } = request.params;
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

		if (isEmpty(observables[roomId])) {
			observables[roomId] = new Observable();
			store[roomId] = cloneDeep(roomTemplate);
		}

		const unsubscribe = observables[roomId].subscribe(sendEvent);

		if (isEmpty(store[roomId].votes)) {
			store[roomId].startTime = Date.now();
			store[roomId].timeTaken = 0;
		}

		store[roomId].votes[id] = { name, vote: "?" };
		closeConnection[id] = () => response.end();
		observables[roomId].publish(store[roomId]);

		console.log(`Connection established to ${id} ${name}`);

		request.on("close", () => {
			unsubscribe();
			delete store[roomId].votes[id];
			observables[roomId].publish(store[roomId]);
			console.log(`Connection closed to ${id} ${name}`);
		});
	}
);

app.get("*", (request, response) => {
	response.sendFile(
		new URL("client/dist/index.html", import.meta.url).pathname
	);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
