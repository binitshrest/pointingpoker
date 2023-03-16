import process from "node:process";
import express from "express";
import observable from "./observable.js";

const store = { votes: {} };

const app = express();
app.use(express.json());
app.use(express.static(new URL("client/dist", import.meta.url).pathname));

app.post("/vote", (request, response) => {
	response.sendStatus(200);

	const { vote, name } = request.body;
	store.votes[name] = vote;
	observable.publish(JSON.stringify(store));
});

app.get("/events/:name", (request, response) => {
	response.writeHead(200, {
		"Content-Type": "text/event-stream",
		Connection: "keep-alive",
		"Cache-Control": "no-cache",
	});

	response.write("retry: 10000\n\n");

	const func = (data) => {
		response.write(`data: ${data}\n\n`);
	};

	const unsubscribe = observable.subscribe(func);

	store.votes[request.params.name] = "?";
	observable.publish(JSON.stringify(store));

	console.log("Connection established");

	request.on("close", () => {
		unsubscribe();
		delete store.votes[request.params.name];
		observable.publish(JSON.stringify(store));
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
