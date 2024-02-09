import { z } from "zod"
import { useForm } from "react-hook-form"
import { getStore } from "@/hooks/store"
import { currentUser } from "@/utils/firebase"
import { zodResolver } from "@hookform/resolvers/zod"
import { isNewPlayer } from "@/utils/misc"
import { setName } from "@/utils/rtdb"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"

type NameFormProps = {
  initialValue: string
  toggleInputDisplay: () => void
}

const formSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1)
    .max(15)
    .refine((val) => {
      if (val === currentUser.displayName) return true

      const { users } = getStore()
      return !Object.values(users)
        .map(({ name }) => name)
        .includes(val)
    }),
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
              <FormControl>
                <Input placeholder="Your username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

// [ ]: error ui
// [ ]: edit input size when changing typography