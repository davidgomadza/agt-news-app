import { api } from "encore.dev/api";
import db from "../db";
import type { Category } from "../article/types";

interface ListCategoriesResponse {
  categories: Category[];
}

// Retrieves all categories.
export const list = api<void, ListCategoriesResponse>(
  { expose: true, method: "GET", path: "/categories" },
  async () => {
    const rows = await db.queryAll<{
      id: number;
      name: string;
      slug: string;
      created_at: Date;
    }>`
      SELECT id, name, slug, created_at
      FROM categories
      ORDER BY name ASC
    `;

    const categories: Category[] = rows.map(row => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      createdAt: row.created_at,
    }));

    return { categories };
  }
);
