import LogRocket from "logrocket"
import { renderV1 } from "./utils/ui-v1"
import { renderV2 } from "./utils/ui-v2"

type UIVersion = "v1" | "v2"

LogRocket.init(import.meta.env.VITE_LOGROCKET_APPKEY, {
  shouldDebugLog: import.meta.env.DEV,
})

let currVersion = localStorage.getItem("ui") as UIVersion
if (!currVersion) {
  currVersion = "v2"
  localStorage.setItem("ui", currVersion)
}

currVersion === "v1" ? renderV1() : renderV2()
