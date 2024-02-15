import { StrictMode, Suspense, lazy } from "react"
import ReactDOM from "react-dom/client"
import { cleanUp, createRootElement, setCleanUp } from "./ui"
import { SkeletonLoader } from "@/ui-v2/components/skeleton-loader"

export function renderV2() {
  cleanUp?.()

  const rootElement = createRootElement()
  const root = ReactDOM.createRoot(rootElement)
  const UIV2 = lazy(() => import("@/ui-v2/ui-v2"))
  root.render(
    <StrictMode>
      <Suspense fallback={<SkeletonLoader />}>
        <UIV2 />
      </Suspense>
    </StrictMode>,
  )

  localStorage.setItem("ui", "v2")

  setCleanUp(() => {
    root.unmount()
    document.querySelector("#root")?.remove()
  })
}
