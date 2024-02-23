import { Skeleton } from "./ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import "../styles/globals.css"

export function SkeletonLoader() {
  return (
    <div className="grid grid-rows-[auto_1fr] place-items-center w-full h-dvh cursor-progress">
      <div className="flex justify-between items-center gap-y-3 flex-wrap content-center w-full max-w-screen-2xl h-20">
        <Skeleton className="h-4 w-40 ml-4" />
        <div className="flex gap-4 mx-4">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-7 w-7 rounded-full" />
        </div>
        <Skeleton className="h-px w-full mx-4" />
      </div>
      <div className="flex flex-col gap-6 my-8 mx-4 max-w-xl">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-11 px-8" />
          <Skeleton className="h-11 px-8" />
          <Skeleton className="h-11 px-8" />
          <Skeleton className="h-11 px-8" />
          <Skeleton className="h-11 px-8" />
          <Skeleton className="h-11 px-8" />
          <Skeleton className="h-11 px-8" />
          <Skeleton className="h-11 px-8" />
        </div>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-4 w-20" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid grid-cols-[25%_2fr_1fr]">
              <Skeleton className="h-4 w-4 rounded-full justify-self-center mr-4" />
              <Skeleton className="h-4 w-20 mr-4" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <div className="grid grid-cols-[25%_2fr_1fr]">
              <Skeleton className="h-4 w-4 rounded-full justify-self-center mr-4" />
              <Skeleton className="h-4 w-20 mr-4" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <div className="grid grid-cols-[25%_2fr_1fr]">
              <Skeleton className="h-4 w-4 rounded-full justify-self-center mr-4" />
              <Skeleton className="h-4 w-20 mr-4" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <div className="grid grid-cols-[25%_2fr_1fr]">
              <Skeleton className="h-4 w-4 rounded-full justify-self-center mr-4" />
              <Skeleton className="h-4 w-20 mr-4" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <StatsSkeletonLoader />
      </div>
    </div>
  )
}

export function StatsSkeletonLoader() {
  return (
    <Card className="shadow-none">
      <CardHeader className="flex-row justify-between space-y-0 items-center">
        <CardTitle>
          <Skeleton className="h-4 w-20" />
        </CardTitle>
        <Skeleton className="h-6 px-6 rounded-xl" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 grid-rows-5 h-64 place-items-center">
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-3 row-start-2" />
          <Skeleton className="h-3 w-3 row-start-3" />
          <Skeleton className="h-3 w-3 row-start-4" />
          <Skeleton className="h-3 w-3 row-start-5" />
          <Skeleton className="h-3 w-3 row-start-5" />
          <Skeleton className="h-3 w-3 row-start-5" />
          <Skeleton className="h-3 w-3 row-start-5" />
          <Skeleton className="h-3 w-3 row-start-5" />
          <Skeleton className="h-6 w-8 row-start-4 self-end" />
          <Skeleton className="h-20 w-8 row-start-4 self-end" />
          <Skeleton className="h-32 w-8 row-start-4 self-end" />
          <Skeleton className="h-44 w-8 row-start-4 self-end" />
        </div>
      </CardContent>
    </Card>
  )
}
