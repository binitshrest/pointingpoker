import { Check, Copy, Info, UserRoundPlus } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Alert, AlertDescription } from "./ui/alert"
import { useEffect, useState } from "react"

export function ShareSessionCard() {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHasCopied(false)
    }, 2 * 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [hasCopied])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Pointing Session</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5">
        <UserRoundPlus
          strokeWidth={1}
          className="h-20 w-20 min-[512px]:h-24 min-[512px]:w-24 sm:h-32 sm:w-32"
        />
        <div className="text-center">
          Missing some key players? Share the link and invite others to join.
        </div>
        <div className="rounded-lg border bg-zinc-100 dark:bg-zinc-900 pl-4 pr-2 py-2 transition-colors text-nowrap">
          {location.href}{" "}
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 translate-y-[1px]"
            onClick={async () => {
              await navigator.clipboard.writeText(location.href)
              setHasCopied(true)
            }}
          >
            {hasCopied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Alert variant="secondary" className="flex-grow">
          <Info className="h-4 w-4 -translate-y-[1px]" />
          <AlertDescription>
            You can also switch rooms by changing #
            <b className="font-semibold text-nowrap">
              {location.hash.slice(1)}
            </b>
          </AlertDescription>
        </Alert>
      </CardFooter>
    </Card>
  )
}
