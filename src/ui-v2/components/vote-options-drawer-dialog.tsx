import { useState, useSyncExternalStore } from "react"
import { useStore } from "@/hooks/store"
import { createExternalStore } from "@/utils/create-external-store"
import { selectVoteOptions } from "@/utils/rtdb"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { VoteButtonsPreview } from "./vote-buttons-preview"
import { CustomVoteOptionsDialog } from "./custom-vote-options-dialog"
import { useMedia } from "react-use"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer"

const [subscribe, getSnapshot, setOpen] = createExternalStore(false)

export const setVoteOptionsDrawerDialogOpen = setOpen

export function VoteOptionsDrawerDialog() {
  const open = useSyncExternalStore(subscribe, getSnapshot)
  const { voteOptionsList, selectedVoteOptionsKey } = useStore()
  const [currentSelectedKey, setCurrentSelectedKey] = useState(
    selectedVoteOptionsKey,
  )
  const isDesktop = useMedia("(min-width: 768px)")

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    await selectVoteOptions(currentSelectedKey)
    setOpen(false)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl gap-6">
          <DialogHeader>
            <DialogTitle>Change Vote Options</DialogTitle>
            <DialogDescription>
              You can change this room&apos;s vote options here. Click save when
              done. Do note that changing the vote options will clear votes and
              reset the timer.
            </DialogDescription>
          </DialogHeader>
          <VoteButtonsPreview
            voteValues={Object.values(voteOptionsList[currentSelectedKey])}
          />
          <VoteOptionsForm
            onSubmit={onSubmit}
            currentSelectedKey={currentSelectedKey}
            setCurrentSelectedKey={setCurrentSelectedKey}
          />
          <DialogFooter className="gap-y-2 sm:justify-between">
            <CustomVoteOptionsDialog />
            <Button type="submit" onClick={onSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="gap-2">
        <DrawerHeader>
          <DrawerTitle>Change Vote Options</DrawerTitle>
          <DrawerDescription>
            You can change this room&apos;s vote options here. Tap save when
            done. Do note that changing the vote options will clear votes and
            reset the timer.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col px-4 gap-6">
          <VoteButtonsPreview
            voteValues={Object.values(voteOptionsList[currentSelectedKey])}
          />
          <VoteOptionsForm
            onSubmit={onSubmit}
            currentSelectedKey={currentSelectedKey}
            setCurrentSelectedKey={setCurrentSelectedKey}
          />
        </div>
        <DrawerFooter>
          <Button type="submit" onClick={onSubmit}>
            Save changes
          </Button>
          <CustomVoteOptionsDialog />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

interface VoteOptionsFormProps extends React.ComponentProps<"form"> {
  currentSelectedKey: string
  setCurrentSelectedKey: React.Dispatch<React.SetStateAction<string>>
}

function VoteOptionsForm({
  currentSelectedKey,
  setCurrentSelectedKey,
  ...props
}: VoteOptionsFormProps) {
  const { voteOptionsList } = useStore()

  return (
    <form {...props}>
      <RadioGroup
        value={currentSelectedKey}
        onValueChange={setCurrentSelectedKey}
        className="justify-center"
        name="voteOptions"
      >
        {Object.entries(voteOptionsList).map(([key, options], index) => (
          <div key={index} className="flex gap-3 items-center">
            <RadioGroupItem value={key} id={key} />
            <Label htmlFor={key} className="text-base">
              {Object.values(options).join(", ")}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </form>
  )
}
