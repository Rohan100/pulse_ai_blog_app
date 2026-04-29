import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ArrowUpRight, FileText, Users, LogOut } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminAnalytics, getAdminPosts } from "@/lib/api";
import { logoutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const cookieStr = `access_token=${token}`;
  
  let analytics;
  let adminPosts;

  try {
    [analytics, adminPosts] = await Promise.all([
      getAdminAnalytics(cookieStr),
      getAdminPosts(cookieStr),
    ]);
  } catch (err) {
    redirect("/login");
  }

  const { posts } = adminPosts;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge variant="secondary" className="mb-4">
            Admin
          </Badge>
          <h1 className="font-heading text-3xl font-semibold tracking-normal sm:text-4xl">
            News admin
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Review story status, authors, categories, and links from a responsive editorial dashboard.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/news" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            View public news
            <ArrowUpRight className="size-3.5" />
          </Link>
          <form action={logoutAction}>
            <Button variant="ghost" size="sm" type="submit" className="gap-2">
              <LogOut className="size-4" />
              Logout
            </Button>
          </form>
        </div>
      </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-4" />
              Total Stories
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{analytics.total_posts}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-4" />
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{analytics.total_views}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Editorial queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="min-w-64 font-medium">
                    <Link href={`/news/${item.slug}`} className="hover:text-primary">
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.view_count || 0}</TableCell>
                  <TableCell className="text-right">{new Date(item.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
