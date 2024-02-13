import { useSyncExternalStore } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { getStore } from "@/hooks/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { currentUser } from "@/utils/firebase"
import { setName } from "@/utils/rtdb"
import { createExternalStore } from "@/utils/create-external-store"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { isNewPlayer } from "@/utils/misc"

const formSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, {
      message:
        "Hold on, your username field seems oddly… invisible! Enter one so we can see you!",
    })
    .max(15, {
      message:
        "Looks like you wrote an epic saga in your username field. While impressive, choose something mortals can remember, brave adventurer.",
    })
    .refine(
      (val) => {
        if (val === currentUser.displayName) return true

        const { users } = getStore()
        return !Object.values(users)
          .map(({ name }) => name)
          .includes(val)
      },
      (val) => ({
        message: `${val} has already been claimed by a mythical creature, possibly a unicorn. Choose another, brave adventurer!`,
      }),
    ),
})

const [subscribe, getSnapshot, setOpen] =
  createExternalStore<boolean>(isNewPlayer())

export const setEditNameDialogOpen = setOpen

export function EditNameDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: currentUser.displayName ?? "",
    },
  })

  const open = useSyncExternalStore(subscribe, getSnapshot)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await setName(values.username)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Username</DialogTitle>
          <DialogDescription>
            Make changes to your username here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
