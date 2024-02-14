import { z } from "zod"
import { isEqual } from "lodash-es"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getStore } from "@/hooks/store"
import { createVoteOptions } from "@/utils/rtdb"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { VoteButtonsPreview } from "./vote-buttons-preview"
import { useState } from "react"

const transform = {
  input: (val: number[] | undefined): string => val?.join?.(", ") ?? "",
  output: (val: string): number[] =>
    val
      .split(",")
      .map((option) => option.trim())
      .filter(Boolean)
      .map(Number),
}

const formSchema = z.object({
  newVoteOptions: z
    .string()
    .transform(transform.output)
    .pipe(
      z
        .number({
          invalid_type_error: "Only number votes are supported at the moment",
        })
        .array()
        .min(2, {
          message: "Not even two vote options? Cmon dude.",
        }),
    )
    .refine(
      (val) => {
        if (val.length !== new Set(val).size) return false

        return true
      },
      {
        message:
          "Duplicate alert! Your enthusiasm is appreciated, but each number deserves to shine on its own.",
      },
    )
    .refine(
      (val) => {
        const { voteOptionsList } = getStore()

        return !Object.values(voteOptionsList).some((voteOptions) =>
          isEqual(Object.values(voteOptions), val),
        )
      },
      {
        message:
          "Whoa, déjà vu! It seems this list is already chilling in this room. Try something new and exciting!",
      },
    )
    .transform(transform.input),
})

export function CustomVoteOptionsDialog() {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newVoteOptions: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createVoteOptions({ ...transform.output(values.newVoteOptions) })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create new options</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Vote Options</DialogTitle>
          <DialogDescription>
            You can add more vote options here. Click create when done.
          </DialogDescription>
        </DialogHeader>
        <VoteButtonsPreview
          voteValues={transform.output(form.watch("newVoteOptions"))}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            <FormField
              control={form.control}
              name="newVoteOptions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vote options</FormLabel>
                  <FormControl>
                    <Input placeholder="1, 2, 3, 4..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-y-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
