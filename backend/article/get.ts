import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Article } from "./types";

interface GetArticleRequest {
  slug: string;
}

// Retrieves a single article by slug.
export const get = api<GetArticleRequest, Article>(
  { expose: true, method: "GET", path: "/articles/:slug" },
  async (req) => {
    const row = await db.queryRow<{
      id: number;
      title: string;
      slug: string;
      excerpt: string;
      content: string;
      author: string;
      category_id: number;
      category_name: string;
      category_slug: string;
      image_url: string | null;
      is_breaking: boolean;
      is_featured: boolean;
      published_at: Date;
      created_at: Date;
      updated_at: Date;
    }>`
      SELECT 
        articles.id,
        articles.title,
        articles.slug,
        articles.excerpt,
        articles.content,
        articles.author,
        articles.category_id,
        categories.name as category_name,
        categories.slug as category_slug,
        articles.image_url,
        articles.is_breaking,
        articles.is_featured,
        articles.published_at,
        articles.created_at,
        articles.updated_at
      FROM articles
      JOIN categories ON articles.category_id = categories.id
      WHERE articles.slug = ${req.slug}
    `;

    if (!row) {
      throw APIError.notFound("article not found");
    }

    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      author: row.author,
      categoryId: row.category_id,
      categoryName: row.category_name,
      categorySlug: row.category_slug,
      imageUrl: row.image_url ?? undefined,
      isBreaking: row.is_breaking,
      isFeatured: row.is_featured,
      publishedAt: row.published_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
);
