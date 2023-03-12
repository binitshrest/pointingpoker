import React from "react";
// eslint-disable-next-line n/file-extension-in-import
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import "./index.css";

ReactDOM.createRoot(document.querySelector("#root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
