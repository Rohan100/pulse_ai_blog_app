import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { newsItems } from "@/lib/news";

export default function NewsPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <Badge variant="secondary" className="mb-4">
          News
        </Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-normal sm:text-4xl">
          Latest updates
        </h1>
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          Browse current Pulse stories across business, policy, entertainment, and community coverage.
        </p>
      </div>

      <div className="grid gap-4">
        {newsItems.map((item) => (
          <Card key={item.id} className="min-h-32 rounded-sm">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between gap-3">
                <Badge variant="outline">{item.category}</Badge>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 text-sm leading-6 text-muted-foreground">
              {item.excerpt}
            </CardContent>
            <CardFooter>
              <Link
                href={`/news/${item.id}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                Read story
                <ArrowUpRight className="size-3.5" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
