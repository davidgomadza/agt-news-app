export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  imageUrl?: string;
  isBreaking: boolean;
  isFeatured: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateArticleRequest {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  categoryId: number;
  imageUrl?: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
}

export interface UpdateArticleRequest {
  id: number;
  title?: string;
  excerpt?: string;
  content?: string;
  author?: string;
  categoryId?: number;
  imageUrl?: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
}
