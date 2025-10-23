import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, User, ArrowLeft } from "lucide-react";
import backend from "~backend/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { sanitizeUrl } from "@/lib/sanitize";

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      if (!slug) throw new Error("No slug provided");
      const response = await backend.article.get({ slug });
      return response;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <Link to="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-4xl mx-auto">
      <Link to="/" className="inline-block mb-6">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link to={`/category/${article.categorySlug}`}>
            <Badge variant="secondary">{article.categoryName}</Badge>
          </Link>
          {article.isBreaking && <Badge variant="destructive">Breaking</Badge>}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {article.imageUrl && (
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={sanitizeUrl(article.imageUrl)}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <p className="text-xl font-medium text-muted-foreground mb-6">
            {article.excerpt}
          </p>
          <div className="whitespace-pre-wrap">{article.content}</div>
        </div>
      </div>
    </article>
  );
}
