import { useState, useSyncExternalStore } from "react"
import { z } from "zod"
import { UseFormReturn, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMedia } from "react-use"
import ky from "ky"
import { Bugfender } from "@bugfender/sdk"
import { createExternalStore } from "@/utils/create-external-store"
import { cn } from "@/utils/cn"
import { currentUser } from "@/utils/firebase"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer"
import { Textarea } from "./ui/textarea"

const formSchema = z.object({
  text: z.string().trim().min(1, {
    message: "Just your two cents would be super helpful!",
  }),
})

const [subscribe, getSnapshot, setOpen] = createExternalStore(false)

export const setFeedbackDrawerDialogOpen = setOpen

export function FeedbackDrawerDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  })

  const open = useSyncExternalStore(subscribe, getSnapshot)
  const isDesktop = useMedia("(min-width: 768px)")
  const [showThankYou, setShowThankYou] = useState(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setShowThankYou(true)
    try {
      await ky.post("https://feedback.abizek.workers.dev", {
        json: {
          text: "From " + currentUser.displayName + ": " + values.text,
        },
      })
    } catch (error) {
      Bugfender.error(error)
    }

    setTimeout(() => {
      setShowThankYou(false)
      setOpen(false)
      form.reset()
    }, 3 * 1000)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <HideOnThankYou
            showThankYou={showThankYou}
            className="flex flex-col gap-6 max-w-lg"
          >
            <DialogHeader>
              <DialogTitle>Send Feedback</DialogTitle>
              <DialogDescription>
                I would love to hear your thoughts.
              </DialogDescription>
            </DialogHeader>
            <FeedbackForm onSubmit={onSubmit} {...form} />
            <DialogFooter>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Send
              </Button>
            </DialogFooter>
          </HideOnThankYou>
          <ThankYou showThankYou={showThankYou} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <HideOnThankYou
          showThankYou={showThankYou}
          className="flex flex-col gap-2"
        >
          <DrawerHeader>
            <DrawerTitle>Send Feedback</DrawerTitle>
            <DrawerDescription>
              I would love to hear your thoughts.
            </DrawerDescription>
          </DrawerHeader>
          <FeedbackForm onSubmit={onSubmit} {...form} className="px-4" />
          <DrawerFooter>
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Send
            </Button>
          </DrawerFooter>
        </HideOnThankYou>
        <ThankYou showThankYou={showThankYou} />
      </DrawerContent>
    </Drawer>
  )
}

interface FeedbackFormProps extends UseFormReturn<z.infer<typeof formSchema>> {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>
  className?: string
}

function FeedbackForm({ onSubmit, className, ...form }: FeedbackFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-y-4", className)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Any likes, dislikes, bugs you want to squash, features you'd like to see, or... just a little Hi!"
                  className="resize-none h-48"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                I&apos;m always down to talk, so feel free to leave your contact
                info if you wanna keep the convo rolling!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

function ThankYou({ showThankYou }: { showThankYou: boolean }) {
  return (
    <div
      data-thanks={showThankYou}
      className="absolute grid place-items-center w-full h-full -z-10 transition-opacity duration-500 data-[thanks=false]:opacity-0 data-[thanks=true]:opacity-100"
    >
      <h2 className="text-3xl font-semibold">Thank you!</h2>
    </div>
  )
}

function HideOnThankYou({
  showThankYou,
  className,
  children,
}: {
  showThankYou: boolean
  className: string
  children: React.ReactNode
}) {
  return (
    <div
      data-thanks={showThankYou}
      className={cn(
        "transition-opacity data-[thanks=false]:opacity-100 data-[thanks=true]:opacity-0",
        className,
      )}
    >
      {children}
    </div>
  )
}
