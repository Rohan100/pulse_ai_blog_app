import Link from "next/link"
import { ArrowUpRight, CircleDot } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { newsItems } from "@/lib/news"

function getTime(date: string) {
  return new Date(date).getTime()
}

export default function TimelinePage() {
  const timelineStories = [...newsItems].sort((first, second) => {
    return getTime(second.date) - getTime(first.date)
  })

  return (
    <main className="flex w-full flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="mb-4">
            Timeline
          </Badge>
          <h1 className="font-heading text-3xl font-semibold tracking-normal sm:text-4xl">
            News timeline
          </h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Follow each story as a sequence of incidents, from the first
            reported event through the latest update.
          </p>
        </div>

        <div className="border-b" />
      </div>

      <div className="grid gap-6">
        {timelineStories.map((item) => {
          const incidents = [...item.timeline].sort((first, second) => {
            return getTime(first.date) - getTime(second.date)
          })

          return (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              aria-label={`Read ${item.title}`}
              className="block rounded-sm outline-none transition-transform focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Card className="rounded-sm transition-colors hover:border-primary/40 hover:bg-muted/30">
                <CardContent className="grid gap-5 p-4 sm:p-5">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div className="grid gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{item.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Updated {item.date}
                        </span>
                      </div>
                      <h2 className="font-heading text-xl font-semibold leading-7">
                        {item.title}
                      </h2>
                      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                        {item.excerpt}
                      </p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-1 text-sm font-medium text-primary">
                      Read story
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  </div>

                  <ol className="relative grid gap-4 before:absolute before:bottom-2 before:left-4 before:top-2 before:w-px before:bg-border">
                    {incidents.map((event) => (
                      <li
                        key={`${item.id}-${event.date}-${event.title}`}
                        className="relative grid gap-1 pl-10"
                      >
                        <div className="absolute left-0 top-0.5 flex size-8 items-center justify-center rounded-full border bg-background text-primary">
                          <CircleDot className="size-4" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {event.date}
                        </span>
                        <h3 className="text-sm font-semibold leading-5">
                          {event.title}
                        </h3>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {event.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
