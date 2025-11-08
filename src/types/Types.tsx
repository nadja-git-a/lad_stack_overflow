type Role = 'user' | 'admin';
export type MarkType = 'like' | 'dislike';

export interface ErrorMessage {
  data: {
    message: string;
  };
}

export interface UserRequest {
  username: string;
  password: string;
}

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

export interface UiUser {
  id: number;
  username: string;
  role: Role;
}

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

export interface UserStatistics extends UiUser {
  statistic: UserStatisticData;
}

export interface Mark {
  id: string;
  type: MarkType;
  user: { id: string; username: string; role: 'user' | 'admin' };
}

export interface CreateSnippet {
  language: string;
  code: string;
}
export interface SnippetWithoutMarks extends CreateSnippet {
  id: number;
  user?: UiUser;
}

export interface SnippetApi extends SnippetWithoutMarks {
  commentsCount?: number;
  marks: Mark[];
  comments?: CommentResponse[];
}

export interface Snippet extends SnippetApi {
  likesCount: number;
  dislikesCount: number;
}

export interface CommentResponse {
  id: string | number;
  content: string;
  user: UiUser;
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

export interface AskQuestion {
  title: string;
  description: string;
  attachedCode: string | null;
}

export interface Question extends AskQuestion {
  id: string;
  user: UiUser;
  answers: Answer[];
  isResolved: boolean;
}

export interface NewAnswer {
  questionId: string;
  content: string;
}

export interface Answer extends NewAnswer {
  isCorrect: Boolean;
}

export interface UpdateMeRequest {
  username: string;
}

export interface UpdateResponse {
  updatedCount: number;
}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}
