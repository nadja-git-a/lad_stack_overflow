import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  CommentResponse,
  CreateSnippet,
  Envelope,
  Mark,
  MarkType,
  MyComment,
  QueryArgs,
  Question,
  Snippet,
  SnippetApi,
  UiUser,
  UpdateMeRequest,
  UpdateMeResponse,
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
  tagTypes: ['Snippet', 'Statistics', 'Comments', 'User'],
  endpoints: (build) => ({
    logIn: build.mutation<Envelope<UiUser> | Envelope<UiUser>[], UserRequest>({
      query: (body) => ({ url: 'api/auth/login', method: 'POST', body }),
    }),

    register: build.mutation<Envelope<UiUser> | Envelope<UiUser>[], UserRequest>({
      query: (body) => ({ url: 'api/register', method: 'POST', body }),
    }),

    auth: build.query<UiUser, void>({
      query: () => ({ url: 'api/auth', method: 'GET' }),
      providesTags: ['User'],
    }),

    updateMe: build.mutation<UpdateMeResponse, UpdateMeRequest>({
      query: (body) => ({
        url: 'api/me',
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

      providesTags: (result, error, { id }) => [{ type: 'Comments' as const, id }],
    }),

    snippets: build.query<Envelope<Snippet[]>, QueryArgs>({
      query: (args) => {
        const p = new URLSearchParams();
        if (args?.userId != null) p.set('userId', String(args.userId));
        if (args?.page != null) p.set('page', String(args.page));
        if (args?.limit != null) p.set('limit', String(args.limit));
        args?.sortBy?.forEach((s) => p.append('sortBy', s));
        return { url: `api/snippets${p.toString() ? `?${p}` : ''}`, method: 'GET' };
      },

      transformResponse: (raw: { data: Envelope<Snippet[]> }): Envelope<Snippet[]> => {
        const env = raw.data;
        // console.log({ raw });
        const arr = Array.isArray(raw?.data?.data) ? raw.data.data : [];

        const toNum = (v: unknown) => (Number.isFinite(Number(v)) ? Number(v) : 0);
        const count = (xs: any[] | undefined, t: string) =>
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

    markSnippet: build.mutation<any, { id: number; mark: 'like' | 'dislike' | 'none' }>({
      query: ({ id, mark }) => ({
        url: `api/snippets/${id}/mark`,
        method: 'POST',
        body: { mark },
      }),
      invalidatesTags: (_result, _err, arg) => ['Statistics'],
    }),

    leaveComment: build.mutation<CommentResponse, MyComment>({
      query: (body) => ({ url: '/api/comments', method: 'POST', body }),
      invalidatesTags: (_result, _err, arg) => ['Comments'],
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
  useRegisterMutation,
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
} = api;
