import { z } from "zod"
import { useForm } from "react-hook-form"
import { getStore } from "@/hooks/store"
import { currentUser } from "@/utils/firebase"
import { zodResolver } from "@hookform/resolvers/zod"
import { isNewPlayer } from "@/utils/misc"
import { setName } from "@/utils/rtdb"
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

type NameFormProps = {
  initialValue: string
  toggleInputDisplay: () => void
}

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

export function NameForm({ initialValue, toggleInputDisplay }: NameFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: isNewPlayer() ? "" : initialValue,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await setName(values.username)
    toggleInputDisplay()
  }

  return (
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
      </form>
    </Form>
  )
}

// [ ]: edit input size when changing typography
