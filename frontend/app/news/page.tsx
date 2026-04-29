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
import { getPosts, Post } from "@/lib/api";
import { ComboboxMultiple } from "@/components/filter-multiselect";

type NewsSearchParams = {
  category?: string | string[];
};

function allParams(value: string | string[] | undefined) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<NewsSearchParams>;
}) {
  const params = await searchParams;
  const activeCategories = allParams(params.category);
  
  // Fetch posts from API, applying category filter if there is exactly one
  // (Our backend currently supports filtering by one category via query param)
  // For multiple categories, we can fetch all and filter in memory, or modify backend.
  // We'll fetch all published posts and filter in memory for simplicity to match existing logic.
  const data = await getPosts({ limit: 100 });
  const allPosts = data.posts;
  
  const categories = Array.from(new Set(allPosts.map((item) => item.category))).sort();

  const filteredItems = allPosts.filter((item) => {
    return activeCategories.length === 0 || activeCategories.includes(item.category);
  });

  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
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
          <ComboboxMultiple
            items={categories}
            selectedItems={activeCategories}
            resultCount={filteredItems.length}
            totalCount={allPosts.length}
          />
        </div>

        <div className="border-b" />
      </div>

      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="min-h-32 rounded-sm">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between gap-3">
                <Badge variant="outline">{item.category}</Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 text-sm leading-6 text-muted-foreground">
              {item.summary || item.content.slice(0, 150) + "..."}
            </CardContent>
            <CardFooter>
              <Link
                href={`/news/${item.slug}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                Read story
                <ArrowUpRight className="size-3.5" />
              </Link>
            </CardFooter>
          </Card>
        ))}
        {filteredItems.length === 0 && (
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>No stories match these filters</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              Adjust the search text, topic, or status to broaden the results.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
