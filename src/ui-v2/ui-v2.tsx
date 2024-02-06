import { Nav } from "./components/nav"
import "./styles/globals.css"

export function UIV2() {
  return (
    <div className="grid grid-rows-[auto_1fr] place-items-center h-screen">
      <Nav />
      <div className="flex flex-col">Hello!</div>
    </div>
  )
}
