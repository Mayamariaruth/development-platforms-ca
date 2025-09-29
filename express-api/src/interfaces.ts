export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
}

export interface Article {
  id: number;
  title: string;
  body: string;
  category: string;
  user_id: number;
  created_at?: Date;
}

export interface ArticleWithUser extends Article {
  username: string;
  email: string;
}
