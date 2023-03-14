let data = {};

class Store {
	subscribe(callback) {
		const eventSource = new window.EventSource("/events");

		const listener = (event) => {
			data = JSON.parse(event.data);
			console.log("new data", data);
			callback();
		};

		eventSource.addEventListener("message", listener);

		return () => eventSource.removeEventListener("message", listener);
	}

	getSnapshot() {
		return data;
	}
}

const store = new Store();
export default store;
