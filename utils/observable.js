export class Observable {
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
		const stringifiedData = JSON.stringify(data);
		for (const func of this.observers) {
			func(stringifiedData);
		}
	}
}
