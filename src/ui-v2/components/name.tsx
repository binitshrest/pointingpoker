import { useToggle } from "@/hooks/toggle"
import { cn } from "@/utils/cn"
import { currentUser } from "@/utils/firebase"
import { isNewPlayer } from "@/utils/misc"
import { NameForm } from "./name-form"

type NameProps = {
  children: string
}

export function Name({ children }: NameProps) {
  const isCurrentPlayer = children === currentUser.displayName

  const [showInput, toggleInputDisplay] = useToggle(isNewPlayer())

  return (
    <div className="col-start-2 text-left">
      {showInput && isCurrentPlayer ? (
        <NameForm initialValue={children} toggleInputDisplay={toggleInputDisplay} />
      ) : (
        <span
          onClick={toggleInputDisplay}
          className={cn({ "cursor-edit": isCurrentPlayer })}
        >
          {children} {isNewPlayer() && isCurrentPlayer && "(you)"}
        </span>
      )}
    </div>
  )
}
