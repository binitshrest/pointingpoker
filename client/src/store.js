let data = 0;

class Store {
	subscribe(callback) {
		const eventSource = new window.EventSource("/events");

		const listener = (event) => {
			console.log("new data", event.data);
			data = event.data;
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
