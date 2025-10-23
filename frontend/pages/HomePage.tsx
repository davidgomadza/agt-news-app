import { useQuery } from "@tanstack/react-query";
import backend from "~backend/client";
import ArticleCard from "../components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await backend.article.list({ limit: 20, offset: 0 });
      return response.articles;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-96 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-80 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const featuredArticle = articles?.find((a) => a.isFeatured);
  const breakingNews = articles?.filter((a) => a.isBreaking && !a.isFeatured);
  const regularArticles = articles?.filter((a) => !a.isFeatured && !a.isBreaking);

  return (
    <div className="space-y-12">
      {featuredArticle && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Story</h2>
          <ArticleCard article={featuredArticle} featured />
        </section>
      )}

      {breakingNews && breakingNews.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Breaking News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breakingNews.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {regularArticles && regularArticles.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
