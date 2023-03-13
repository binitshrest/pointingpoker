import process from "node:process";
import express from "express";
import observable from "./observable.js";

const store = { count: 0 };

const app = express();
app.use(express.static(new URL("client/dist", import.meta.url).pathname));

app.post("/count", (request, response) => {
	store.count += 1;
	observable.publish(JSON.stringify(store));
	response.sendStatus(200);
});

app.get("/events", (request, response) => {
	response.writeHead(200, {
		"Content-Type": "text/event-stream",
		Connection: "keep-alive",
		"Cache-Control": "no-cache",
	});

	response.write("retry: 10000\n\n");

	const func = (data) => {
		response.write(`data: ${data}\n\n`);
	};

	func(JSON.stringify(store));

	const unsubscribe = observable.subscribe(func);

	console.log("Connection established");

	request.on("close", () => {
		unsubscribe();
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
