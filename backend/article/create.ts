import { api } from "encore.dev/api";
import db from "../db";
import type { Article, CreateArticleRequest } from "./types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Creates a new article.
export const create = api<CreateArticleRequest, Article>(
  { expose: true, method: "POST", path: "/articles" },
  async (req) => {
    const slug = slugify(req.title);
    const isBreaking = req.isBreaking ?? false;
    const isFeatured = req.isFeatured ?? false;

    const articleRow = await db.queryRow<{
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
    }>`
      INSERT INTO articles (title, slug, excerpt, content, author, category_id, image_url, is_breaking, is_featured)
      VALUES (${req.title}, ${slug}, ${req.excerpt}, ${req.content}, ${req.author}, ${req.categoryId}, ${req.imageUrl ?? null}, ${isBreaking}, ${isFeatured})
      RETURNING *
    `;

    if (!articleRow) {
      throw new Error("Failed to create article");
    }

    const categoryRow = await db.queryRow<{
      name: string;
      slug: string;
    }>`
      SELECT name, slug FROM categories WHERE id = ${articleRow.category_id}
    `;

    if (!categoryRow) {
      throw new Error("Category not found");
    }

    const row = {
      ...articleRow,
      category_name: categoryRow.name,
      category_slug: categoryRow.slug,
    };

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
