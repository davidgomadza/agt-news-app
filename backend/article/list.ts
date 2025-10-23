import { api, Query } from "encore.dev/api";
import db from "../db";
import type { Article } from "./types";

interface ListArticlesRequest {
  categoryId?: Query<number>;
  breaking?: Query<boolean>;
  featured?: Query<boolean>;
  limit?: Query<number>;
  offset?: Query<number>;
}

interface ListArticlesResponse {
  articles: Article[];
  total: number;
}

// Retrieves articles, optionally filtered by category or breaking/featured status.
export const list = api<ListArticlesRequest, ListArticlesResponse>(
  { expose: true, method: "GET", path: "/articles" },
  async (req) => {
    const limit = req.limit ?? 20;
    const offset = req.offset ?? 0;
    
    let whereConditions: string[] = [];
    let params: any[] = [];
    let paramIndex = 1;

    if (req.categoryId !== undefined) {
      whereConditions.push(`articles.category_id = $${paramIndex}`);
      params.push(req.categoryId);
      paramIndex++;
    }

    if (req.breaking !== undefined) {
      whereConditions.push(`articles.is_breaking = $${paramIndex}`);
      params.push(req.breaking);
      paramIndex++;
    }

    if (req.featured !== undefined) {
      whereConditions.push(`articles.is_featured = $${paramIndex}`);
      params.push(req.featured);
      paramIndex++;
    }

    const whereClause = whereConditions.length > 0 
      ? `WHERE ${whereConditions.join(' AND ')}` 
      : '';

    const countQuery = `
      SELECT COUNT(*) as count
      FROM articles
      ${whereClause}
    `;

    const countRow = await db.rawQueryRow<{ count: string }>(countQuery, ...params);
    const total = countRow ? parseInt(countRow.count, 10) : 0;

    const query = `
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
      ${whereClause}
      ORDER BY articles.published_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    const rows = await db.rawQueryAll<{
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
    }>(query, ...params, limit, offset);

    const articles: Article[] = rows.map(row => ({
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
    }));

    return { articles, total };
  }
);
