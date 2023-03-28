import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export function useTimer(startTime) {
	const [timer, setTimer] = useState("00:00:00");

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimer(
				DateTime.now().setZone("UTC").minus(startTime).toLocaleString({
					hour: "2-digit",
					minute: "numeric",
					second: "2-digit",
				})
			);
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	});

	return timer;
}
