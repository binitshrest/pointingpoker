import { Bugfender } from "@bugfender/sdk"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { StyleSheetManager } from "styled-components"
import { UIV2 } from "./ui-v2/ui-v2" // [ ]: lazy load both UI comps
import { UIV1 } from "./ui-v1/ui-v1"
import { initUI } from "./utils/ui"

Bugfender.init({
  appKey: import.meta.env.VITE_BUGFENDER_APPKEY,
  printToConsole: import.meta.env.DEV,
  logUIEvents: false,
})

initUI()

// Using shadow dom to isolate conflicting global css stylesheets
const shadowRootUIV1 = document
  .querySelector("#root-ui-v1")
  .attachShadow({ mode: "open" })
const hostUIV1 = document.createElement("div")
hostUIV1.setAttribute("id", "host-ui-v1")
shadowRootUIV1.appendChild(hostUIV1)
ReactDOM.createRoot(hostUIV1).render(
  <StrictMode>
    <StyleSheetManager target={shadowRootUIV1}>
      <UIV1 />
    </StyleSheetManager>
  </StrictMode>,
)

ReactDOM.createRoot(document.querySelector("#root-ui-v2")).render(
  <StrictMode>
    <UIV2 />
  </StrictMode>,
)
