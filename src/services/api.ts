import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Answer,
  AskQuestion,
  CommentResponse,
  CreateSnippet,
  Envelope,
  Mark,
  MarkType,
  MyComment,
  NewAnswer,
  QueryArgs,
  Question,
  Snippet,
  SnippetApi,
  SnippetWithoutMarks,
  UiUser,
  UpdateMeRequest,
  UpdatePassword,
  UpdateResponse,
  UserRequest,
  UserStatistics,
} from '../types/Types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Snippet', 'Statistics', 'Comments', 'User', 'Question', 'Answer'],
  endpoints: (build) => ({
    logIn: build.mutation<Envelope<UiUser> | Envelope<UiUser>[], UserRequest>({
      query: (body) => ({ url: 'api/auth/login', method: 'POST', body }),
    }),

    registerUser: build.mutation<Envelope<UiUser> | Envelope<UiUser>[], UserRequest>({
      query: (body) => ({ url: 'api/register', method: 'POST', body }),
    }),

    auth: build.query<UiUser, undefined>({
      query: () => ({ url: 'api/auth', method: 'GET' }),
      providesTags: ['User'],
    }),

    deleteMe: build.mutation<UiUser, undefined>({
      query: () => ({ url: 'api/me', method: 'DELETE' }),
    }),

    updateMe: build.mutation<UpdateResponse, UpdateMeRequest>({
      query: (body) => ({
        url: 'api/me',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    updatePassword: build.mutation<UpdateResponse, UpdatePassword>({
      query: (body) => ({
        url: 'api/me/password',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    userStatistics: build.query<Envelope<UserStatistics>, { id: number }>({
      query: ({ id }) => {
        const params = new URLSearchParams();
        params.set('id', String(id));

        return {
          url: `api/users/${id}/statistic?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Statistics'],
    }),

    snippetById: build.query<Envelope<Snippet>, { id: number }>({
      query: ({ id }) => ({
        url: `api/snippets/${id}`,
        method: 'GET',
      }),

      transformResponse: (resp: Envelope<SnippetApi>): Envelope<Snippet> => {
        const s = resp.data;

        const count = (xs: Mark[] | undefined, t: MarkType) =>
          Array.isArray(xs) ? xs.filter((m) => m.type === t).length : 0;

        const likes = count(s.marks, 'like');
        const dislikes = count(s.marks, 'dislike');

        return { data: { ...s, likesCount: likes, dislikesCount: dislikes } };
      },

      providesTags: (_, __, { id }) => [{ type: 'Comments', id }],
    }),

    snippets: build.query<Envelope<Snippet[]>, QueryArgs>({
      query: (args) => {
        const p = new URLSearchParams();
        if (args?.userId != null) p.set('userId', String(args.userId));
        if (args?.page != null) p.set('page', String(args.page));
        if (args?.limit != null) p.set('limit', String(args.limit));
        args?.sortBy?.forEach((s) => p.append('sortBy', s));
        if (args?.search) p.set('search', args.search);
        args?.searchBy?.forEach((f) => p.append('searchBy', f));

        return { url: `api/snippets${p.toString() ? `?${p}` : ''}`, method: 'GET' };
      },

      transformResponse: (raw: { data: Envelope<Snippet[]> }): Envelope<Snippet[]> => {
        const env = raw.data;
        const arr = Array.isArray(raw?.data?.data) ? raw.data.data : [];

        const toNum = (v: unknown) => (Number.isFinite(Number(v)) ? Number(v) : 0);
        const count = (xs: Mark[] | undefined, t: string) =>
          Array.isArray(xs) ? xs.filter((m) => m?.type === t).length : 0;

        const parsed: Snippet[] = arr.map((s) => ({
          id: toNum(s?.id),
          language: String(s?.language ?? 'Unknown'),
          code: String(s?.code ?? ''),
          user: s?.user
            ? {
                id: toNum(s.user.id),
                username: String(s.user.username ?? 'unknown'),
                role: s.user.role === 'admin' ? 'admin' : 'user',
              }
            : { id: 0, username: 'unknown', role: 'user' },
          likesCount: count(s?.marks, 'like'),
          dislikesCount: count(s?.marks, 'dislike'),
          commentsCount: count(s?.marks, 'comment'),
          marks: s.marks,
        }));

        return { data: parsed, meta: env.meta, links: env.links };
      },

      providesTags: (res) =>
        res
          ? [
              ...res.data.map(({ id }) => ({ type: 'Snippet' as const, id })),
              { type: 'Snippet' as const, id: 'LIST' },
            ]
          : [{ type: 'Snippet' as const, id: 'LIST' }],
    }),

    deleteSnippet: build.mutation<SnippetWithoutMarks, { id: number }>({
      query: ({ id }) => ({ url: `/api/snippets/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Snippet'],
    }),

    editSnippet: build.mutation<UpdateResponse, SnippetWithoutMarks>({
      query: ({ id, ...patch }) => ({ url: `/api/snippets/${id}`, method: 'PATCH', body: patch }),
      invalidatesTags: ['Snippet'],
    }),

    markSnippet: build.mutation<MarkType, { id: number; mark: MarkType }>({
      query: ({ id, mark }) => ({
        url: `api/snippets/${id}/mark`,
        method: 'POST',
        body: { mark },
      }),
      invalidatesTags: ['Statistics'],
    }),

    leaveComment: build.mutation<CommentResponse, MyComment>({
      query: (body) => ({ url: '/api/comments', method: 'POST', body }),
      invalidatesTags: ['Comments'],
    }),

    createSnippet: build.mutation<Snippet, CreateSnippet>({
      query: (body) => ({ url: '/api/snippets', method: 'POST', body }),
    }),

    questions: build.query<Envelope<Envelope<Question[]>>, QueryArgs>({
      query: ({ page = 1, limit = 15, sortBy, search, searchBy } = {}) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(limit));
        sortBy?.forEach((s) => params.append('sortBy', s));
        if (search) params.set('search', search);
        searchBy?.forEach((f) => params.append('searchBy', f));
        return { url: `api/questions?${params.toString()}` };
      },
      providesTags: ['Question', 'Answer'],
    }),

    askQuestion: build.mutation<AskQuestion, AskQuestion>({
      query: (body) => ({
        url: '/api/questions',
        method: 'POST',
        body,
      }),
    }),

    createAnswer: build.mutation<Answer, NewAnswer>({
      query: (body) => ({
        url: '/api/answers',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Answer'],
    }),

    users: build.query<Envelope<Envelope<UiUser[]>>, QueryArgs>({
      query: ({ page = 1, limit = 15, sortBy, search, searchBy } = {}) => {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', String(limit));

        sortBy?.forEach((s) => params.append('sortBy', s));
        if (search) params.set('search', search);
        searchBy?.forEach((f) => params.append('searchBy', f));

        return { url: `/api/users?${params.toString()}` };
      },
    }),
  }),
});

export const {
  useLogInMutation,
  useRegisterUserMutation,
  useAuthQuery,
  useSnippetsQuery,
  useMarkSnippetMutation,
  useUserStatisticsQuery,
  useSnippetByIdQuery,
  useLeaveCommentMutation,
  useCreateSnippetMutation,
  useQuestionsQuery,
  useUsersQuery,
  useUpdateMeMutation,
  useUpdatePasswordMutation,
  useAskQuestionMutation,
  useCreateAnswerMutation,
  useDeleteMeMutation,
  useDeleteSnippetMutation,
  useEditSnippetMutation,
} = api;
