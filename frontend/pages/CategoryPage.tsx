import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import backend from "~backend/client";
import ArticleCard from "../components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles", "category", categorySlug],
    queryFn: async () => {
      if (!categorySlug) throw new Error("No category slug provided");
      const response = await backend.article.list({
        categorySlug,
        limit: 20,
        offset: 0,
      });
      return response.articles;
    },
    enabled: !!categorySlug,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-80 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold capitalize">
          {categorySlug?.replace(/-/g, " ")}
        </h1>
      </div>

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles found in this category.</p>
        </div>
      )}
    </div>
  );
}
