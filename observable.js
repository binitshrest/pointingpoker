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

export const observable = new Observable();

export function publish(data) {
	observable.publish(JSON.stringify(data));
}
