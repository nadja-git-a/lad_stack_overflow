// логин/рег
export interface UserRequest {
  username: string;
  password: string;
}

// обертка
export interface Envelope<T> {
  data: T;
  meta?: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: [string, 'ASC' | 'DESC'][];
    searchBy: string[];
    search: string | null;
    select: string[];
    filter: Record<string, unknown>;
  };
  links?: {
    current: number;
    next: number;
    last: number;
  };
}

//  пользователь
export interface UiUser {
  id: number;
  username: string;
  role: Role;
}

// статистика пользователя
export interface UserStatisticData {
  snippetsCount: number;
  rating: number;
  commentsCount: number;
  likesCount: number;
  dislikesCount: number;
  questionsCount: number;
  correctAnswersCount: number;
  regularAnswersCount: number;
}

// пльзователь + статистика
export interface UserStatistics extends UiUser {
  statistic: UserStatisticData;
}

type Role = 'user' | 'admin';
export type MarkType = 'like' | 'dislike';

export interface Mark {
  id: string;
  type: MarkType;
  user: { id: string; username: string; role: 'user' | 'admin' };
}

export interface CreateSnippet {
  language: string;
  code: string;
}

// 6. Сниппет
export interface SnippetApi extends CreateSnippet {
  id: number;
  user: UiUser;
  commentsCount?: number;
  marks: Mark[];
  comments?: CommentResponse[];
}

export interface Snippet extends SnippetApi {
  likesCount: number;
  dislikesCount: number;
}

// комменты
export interface CommentResponse {
  data: { id: string | number; content: string; user: UiUser };
}
export interface MyComment {
  content: string;
  snippetId: number;
}

export interface QueryArgs {
  userId?: number;
  page?: number;
  limit?: number;
  sortBy?: string[];
  search?: string;
  searchBy?: string[];
}

export interface Question {
  id: number;
  title: string;
  description: string;
  attachedCode: string | null;
  user: UiUser;
  answers: Answer[];
  isResolved: boolean;
}

export interface Answer {
  id: string;
  content: string;
  isCorrect: Boolean;
}

export interface UpdateMeRequest {
  username: string;
}

export interface UpdateMeResponse {
  updatedCount: number;
}
