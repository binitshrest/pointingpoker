import { StrictMode, Suspense, lazy } from "react"
import ReactDOM from "react-dom/client"
import { cleanUp, createRootElement, setCleanUp } from "./ui"

export function renderV1() {
  cleanUp?.()

  window.document.documentElement.classList.remove("light", "dark")
  const rootElement = createRootElement()
  const shadowRoot = rootElement.attachShadow({ mode: "open" })
  const host = document.createElement("div")
  host.setAttribute("id", "host")
  shadowRoot.appendChild(host)

  const root = ReactDOM.createRoot(host)
  const UIV1 = lazy(() => import("@/ui-v1/ui-v1"))
  root.render(
    <StrictMode>
      <Suspense>
        <UIV1 styleSheetTarget={shadowRoot} />
      </Suspense>
    </StrictMode>,
  )

  localStorage.setItem("ui", "v1")

  setCleanUp(() => {
    root.unmount()
    document.querySelector("#root")?.remove()
  })
}
