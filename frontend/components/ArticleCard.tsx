import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Article } from "~backend/article/types";
import { sanitizeUrl } from "@/lib/sanitize";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (featured) {
    return (
      <Link to={`/article/${article.slug}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
          {article.imageUrl && (
            <div className="aspect-video overflow-hidden">
              <img
                src={sanitizeUrl(article.imageUrl)}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Link
                to={`/category/${article.categorySlug}`}
                className="hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge variant="secondary">{article.categoryName}</Badge>
              </Link>
              {article.isBreaking && <Badge variant="destructive">Breaking</Badge>}
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-3">
              {article.title}
            </h2>
            <p className="text-muted-foreground text-lg line-clamp-2">
              {article.excerpt}
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        {article.imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={sanitizeUrl(article.imageUrl)}
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Link
              to={`/category/${article.categorySlug}`}
              className="hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <Badge variant="secondary" className="text-xs">
                {article.categoryName}
              </Badge>
            </Link>
            {article.isBreaking && (
              <Badge variant="destructive" className="text-xs">
                Breaking
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.excerpt}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
