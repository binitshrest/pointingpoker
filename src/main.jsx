import { Bugfender } from "@bugfender/sdk"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { App } from "./app.jsx"

Bugfender.init({
  appKey: import.meta.env.VITE_BUGFENDER_APPKEY,
  printToConsole: import.meta.env.DEV,
})

ReactDOM.createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
