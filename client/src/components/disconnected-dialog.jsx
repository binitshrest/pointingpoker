import { useEffect, useRef } from "react";
import { useStore } from "../hooks/store.js";

export function DisconnectedDialog() {
	const { connected } = useStore();
	const dialogRef = useRef();

	useEffect(() => {
		const dialog = dialogRef.current;

		if (!connected) {
			dialog?.showModal();
		}

		return () => {
			dialog?.close();
		};
	}, [connected]);

	return (
		<dialog ref={dialogRef} className="nes-dialog">
			<p className="title">Disconnected</p>
			<p>Please refresh to reconnect</p>
		</dialog>
	);
}
