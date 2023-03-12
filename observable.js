class Observable {
	constructor() {
		this.observers = new Set();
	}

	subscribe(func) {
		this.observers.add(func);

		return () => {
			this.observers.delete(func);
		};
	}

	publish(data) {
		for (const func of this.observers) {
			func(data);
		}
	}
}

const observable = new Observable();
export default observable;
