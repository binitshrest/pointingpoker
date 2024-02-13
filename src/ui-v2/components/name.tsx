import { currentUser } from "@/utils/firebase"
import { isNewPlayer } from "@/utils/misc"

type NameProps = {
  children: string
}

export function Name({ children }: NameProps) {
  const isCurrentPlayer = children === currentUser.displayName

  return (
    <div className="col-start-2 text-left">
      {children} {isNewPlayer() && isCurrentPlayer && "(you)"}
    </div>
  )
}
