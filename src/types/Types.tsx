// 1. DTO на логин/регу
export interface UserRequest {
  username: string;
  password: string;
}

// 2. Универсальный ответ API
export interface Envelope<T> {
  data: T;
  message?: string;
}

// 3. Пользователь
export interface UiUser {
  id: number;
  username: string;
  role: 'user' | 'admin';
}

// 4. Базовая статистика пользователя
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

// 5. Пользователь + статистика
export interface UserStatistics extends UiUser {
  statistic: UserStatisticData;
}

// 6. Сниппет (универсальный тип вместо UiSnippet и Snippet)
export interface Snippet {
  id: number;
  language: string;
  code: string;
  user: UiUser;
  likes?: number;
  dislikes?: number;
  comments?: number; // делаем опциональным, чтобы тип покрывал оба твоих кейса
}

// 7. Пропсы карточки сниппета
export interface SnippetCardProps {
  snippet: Snippet;
  onLike?: (id: number) => void;
  onDislike?: (id: number) => void;
  onComment?: (id: number) => void;
  onClick?: () => void;
}

// 8. Комменты
export interface CommentResponse {
  id: string | number;
  content: string;
  user: UiUser;
}
export interface MyComment {
  content: string;
  snippetId: number;
}

export interface CommentListProps {
  comments: Envelope<CommentResponse[]>;
}

// 9. Параметры запроса списка сниппетов
export interface SnippetsQueryArgs {
  userId?: number;
  page?: number;
  limit?: number;
  sortBy?: string[];
}
