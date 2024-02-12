import { Button } from "./ui/button"
import { Gamepad, Github, Moon, Sun, SunMoon } from "lucide-react"
import { renderV1 } from "@/utils/ui-v1"
import { Separator } from "./ui/separator"
import { useTheme } from "./theme-provider"

export function Nav() {
  const { theme, setNextTheme } = useTheme()

  return (
    <nav className="flex justify-between w-full flex-wrap content-center my-3 pl-4 pr-3 max-w-screen-2xl">
      <h1 className="grid place-items-center text-xl font-semibold tracking-tight">
        Pointing Poker
      </h1>
      <div className="flex gap-2">
        <Button onClick={setNextTheme} size="icon" variant="ghost">
          {theme === "light" && <Sun />}
          {theme === "dark" && <Moon />}
          {theme === "system" && <SunMoon />}
        </Button>
        <Button onClick={renderV1} size="icon" variant="ghost">
          <Gamepad className="h-7 w-7" />
        </Button>
        <Button
          onClick={() =>
            window.open("https://github.com/abizek/pointingpoker", "_blank")
          }
          size="icon"
          variant="ghost"
        >
          <Github className="h-7 w-7" />
        </Button>
      </div>
      <Separator className="mt-1" />
    </nav>
  )
}
