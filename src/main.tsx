import { Bugfender } from "@bugfender/sdk"
import { renderV1 } from "./utils/ui-v1"
import { renderV2 } from "./utils/ui-v2"

type UIVersion = "v1" | "v2"

Bugfender.init({
  appKey: import.meta.env.VITE_BUGFENDER_APPKEY,
  printToConsole: import.meta.env.DEV,
  logUIEvents: import.meta.env.PROD,
})

let currVersion = localStorage.getItem("ui") as UIVersion
if (!currVersion) {
  currVersion = "v2"
  localStorage.setItem("ui", currVersion)
}

currVersion === "v1" ? renderV1() : renderV2()
