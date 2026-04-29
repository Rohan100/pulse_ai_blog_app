import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPost } from "@/lib/api";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getPost(id);

  if (!item) {
    notFound();
  }

  return (
    <article className="w-full px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to news
          </Link>
          <Badge variant="secondary">{item.category}</Badge>
        </div>
        <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight tracking-normal sm:text-5xl">
          {item.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-y-2 text-sm text-muted-foreground">
          <span>{new Date(item.created_at).toLocaleDateString()}</span>
          {item.source_urls && item.source_urls.length > 0 && (
            <span className="ml-4">Sources: {item.source_urls.length}</span>
          )}
        </div>
        <Separator className="my-8" />
        <div className="grid text-base leading-8 text-muted-foreground whitespace-pre-wrap">
          {item.content}
        </div>
    </article>
  );
}
