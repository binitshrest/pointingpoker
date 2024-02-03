import { Suspense, lazy } from "react"
import { UIV1 } from "./ui-v1/ui-v1"
import { useUI } from "./hooks/ui"

const UIV2 = lazy(() => import("./ui-v2/ui-v2"))

export function App() {
  const [uiVersion] = useUI()

  return uiVersion === "v1" ? (
    <UIV1 />
  ) : (
    <Suspense>
      <UIV2 />
    </Suspense>
  )
}
