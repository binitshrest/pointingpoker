import { StrictMode } from "react";
// eslint-disable-next-line n/file-extension-in-import
import ReactDOM from "react-dom/client";
import App from "./app.jsx";

ReactDOM.createRoot(document.querySelector("#root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
