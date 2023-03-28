export function Button({ children, onClick, className = "" }) {
	return (
		<button type="button" className={`nes-btn ${className}`} onClick={onClick}>
			{children}
		</button>
	);
}
