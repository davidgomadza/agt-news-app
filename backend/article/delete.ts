import { api, APIError } from "encore.dev/api";
import db from "../db";

interface DeleteArticleRequest {
  id: number;
}

// Deletes an article.
export const deleteArticle = api<DeleteArticleRequest, void>(
  { expose: true, method: "DELETE", path: "/articles/:id" },
  async (req) => {
    const result = await db.exec`
      DELETE FROM articles WHERE id = ${req.id}
    `;
    
    // Note: exec doesn't return row count, so we'll just succeed silently
  }
);
