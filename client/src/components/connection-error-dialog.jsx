import { useEffect, useRef } from "react";
import { useStore } from "../hooks/store.js";

export function ConnectionErrorDialog() {
	const { error } = useStore();
	const dialogRef = useRef();

	useEffect(() => {
		const dialog = dialogRef.current;

		if (error) {
			dialog?.showModal();
		}

		return () => {
			dialog?.close();
		};
	}, [error]);

	return (
		<dialog ref={dialogRef} className="nes-dialog">
			<p className="title">Disconnected</p>
			<p>Please refresh to reconnect</p>
		</dialog>
	);
}
