import { api, APIError } from "encore.dev/api";
import db from "../db";
import type { Article, UpdateArticleRequest } from "./types";

// Updates an existing article.
export const update = api<UpdateArticleRequest, Article>(
  { expose: true, method: "PATCH", path: "/articles/:id" },
  async (req) => {
    const updates: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (req.title !== undefined) {
      updates.push(`title = $${paramIndex}`);
      params.push(req.title);
      paramIndex++;
    }

    if (req.excerpt !== undefined) {
      updates.push(`excerpt = $${paramIndex}`);
      params.push(req.excerpt);
      paramIndex++;
    }

    if (req.content !== undefined) {
      updates.push(`content = $${paramIndex}`);
      params.push(req.content);
      paramIndex++;
    }

    if (req.author !== undefined) {
      updates.push(`author = $${paramIndex}`);
      params.push(req.author);
      paramIndex++;
    }

    if (req.categoryId !== undefined) {
      updates.push(`category_id = $${paramIndex}`);
      params.push(req.categoryId);
      paramIndex++;
    }

    if (req.imageUrl !== undefined) {
      updates.push(`image_url = $${paramIndex}`);
      params.push(req.imageUrl);
      paramIndex++;
    }

    if (req.isBreaking !== undefined) {
      updates.push(`is_breaking = $${paramIndex}`);
      params.push(req.isBreaking);
      paramIndex++;
    }

    if (req.isFeatured !== undefined) {
      updates.push(`is_featured = $${paramIndex}`);
      params.push(req.isFeatured);
      paramIndex++;
    }

    if (updates.length === 0) {
      throw APIError.invalidArgument("no fields to update");
    }

    updates.push(`updated_at = NOW()`);
    params.push(req.id);

    const query = `
      UPDATE articles
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING 
        articles.id,
        articles.title,
        articles.slug,
        articles.excerpt,
        articles.content,
        articles.author,
        articles.category_id,
        articles.image_url,
        articles.is_breaking,
        articles.is_featured,
        articles.published_at,
        articles.created_at,
        articles.updated_at
    `;

    const row = await db.rawQueryRow<{
      id: number;
      title: string;
      slug: string;
      excerpt: string;
      content: string;
      author: string;
      category_id: number;
      image_url: string | null;
      is_breaking: boolean;
      is_featured: boolean;
      published_at: Date;
      created_at: Date;
      updated_at: Date;
    }>(query, ...params);

    if (!row) {
      throw APIError.notFound("article not found");
    }

    const categoryRow = await db.queryRow<{
      name: string;
      slug: string;
    }>`
      SELECT name, slug FROM categories WHERE id = ${row.category_id}
    `;

    if (!categoryRow) {
      throw new Error("Category not found");
    }

    return {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      author: row.author,
      categoryId: row.category_id,
      categoryName: categoryRow.name,
      categorySlug: categoryRow.slug,
      imageUrl: row.image_url ?? undefined,
      isBreaking: row.is_breaking,
      isFeatured: row.is_featured,
      publishedAt: row.published_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
);
