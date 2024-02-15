import { Button } from "./ui/button"
import { Gamepad, Github, Moon, Sun, SunMoon } from "lucide-react"
import { renderV1 } from "@/utils/ui-v1"
import { Separator } from "./ui/separator"
import { useTheme } from "./theme-provider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import { useMedia } from "react-use"
import { MoreDropdownMenu } from "./more-dropdown-menu"

type NavButtonProps = {
  children: React.ReactNode
  onClick: () => void
  tooltipContent: string
}

function NavButton({ children, onClick, tooltipContent }: NavButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" onClick={onClick}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function Nav() {
  const { theme, setNextTheme } = useTheme()
  const isDesktop = useMedia("(min-width: 768px)")

  return (
    <nav className="flex justify-between w-full flex-wrap content-center my-3 pl-4 pr-3 max-w-screen-2xl">
      <h1 className="grid place-items-center text-xl font-semibold tracking-tight">
        Pointing Poker
      </h1>
      <div className="flex gap-2">
        <NavButton onClick={setNextTheme} tooltipContent="Toggle theme">
          {theme === "light" && <Sun />}
          {theme === "dark" && <Moon />}
          {theme === "system" && <SunMoon />}
        </NavButton>
        <NavButton onClick={renderV1} tooltipContent="Switch to old UI">
          <Gamepad className="h-7 w-7" />
        </NavButton>
        <NavButton
          onClick={() =>
            window.open("https://github.com/abizek/pointingpoker", "_blank")
          }
          tooltipContent="View source code"
        >
          <Github className="h-7 w-7" />
        </NavButton>
        {!isDesktop && <MoreDropdownMenu className="w-6" />}
      </div>
      <Separator className="mt-1" />
    </nav>
  )
}
