export function Button({ children, onClick, className = "", submit = false }) {
  return (
    <button
      type={submit ? "submit" : "button"}
      className={`nes-btn ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
