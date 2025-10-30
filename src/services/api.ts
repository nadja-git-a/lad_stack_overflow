import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  CommentResponse,
  Envelope,
  MyComment,
  Snippet,
  SnippetsQueryArgs,
  UiUser,
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
  tagTypes: ['Snippet', 'Statistics', 'Comments'],
  endpoints: (build) => ({
    logIn: build.mutation<Envelope<UiUser> | Envelope<UiUser>[], UserRequest>({
      query: (body) => ({ url: 'api/auth/login', method: 'POST', body }),
    }),

    register: build.mutation<Envelope<UiUser> | Envelope<UiUser>[], UserRequest>({
      query: (body) => ({ url: 'api/register', method: 'POST', body }),
    }),

    auth: build.query<UiUser, void>({
      query: () => ({ url: 'api/auth', method: 'GET' }),
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
      query: ({ id }) => {
        return {
          url: `api/snippets/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['Comments'],
    }),

    snippets: build.query<Snippet[], SnippetsQueryArgs>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args?.userId != null) params.set('userId', String(args.userId));
        if (args?.page != null) params.set('page', String(args.page));
        if (args?.limit != null) params.set('limit', String(args.limit));
        args?.sortBy?.forEach((s) => params.append('sortBy', s));
        const qs = params.toString();

        return { url: `api/snippets${qs ? `?${qs}` : ''}`, method: 'GET' };
      },

      providesTags: (result, error, { page, limit }) => {
        return [{ type: 'Snippet', page, limit }];
      },

      transformResponse: (raw: unknown): Snippet[] => {
        const arr: any[] = Array.isArray(raw as any)
          ? (raw as any)
          : Array.isArray((raw as any)?.data)
            ? (raw as any).data
            : Array.isArray((raw as any)?.data?.data)
              ? (raw as any).data.data
              : [];

        const toNum = (v: unknown) => {
          const n = Number(v);
          return Number.isFinite(n) ? n : 0;
        };

        return arr.map((s: any): Snippet => {
          const likes = Array.isArray(s?.marks)
            ? s.marks.filter((m: any) => m?.type === 'like').length
            : 0;
          const dislikes = Array.isArray(s?.marks)
            ? s.marks.filter((m: any) => m?.type === 'dislike').length
            : 0;
          const comments = Array.isArray(s?.marks)
            ? s.marks.filter((m: any) => m?.type === 'comment').length
            : 0;

          const user: UiUser = s?.user
            ? {
                id: toNum(s.user.id),
                username: String(s.user.username ?? 'unknown'),
                role: (s.user.role === 'admin' ? 'admin' : 'user') as UiUser['role'],
              }
            : { id: 0, username: 'unknown', role: 'user' };

          return {
            id: toNum(s?.id),
            language: String(s?.language ?? 'Unknown'),
            code: String(s?.code ?? ''),
            user,
            likes,
            dislikes,
            comments,
          };
        });
      },
    }),

    markSnippet: build.mutation<any, { id: number; mark: 'like' | 'dislike' | 'none' }>({
      query: ({ id, mark }) => ({
        url: `api/snippets/${id}/mark`,
        method: 'POST',
        body: { mark },
      }),
      // invalidatesTags: (_result, _err, arg) => [{ type: 'Snippet', id: arg.id }],
      invalidatesTags: (_result, _err, arg) => ['Statistics'],
    }),

    leaveComment: build.mutation<CommentResponse, MyComment>({
      query: (body) => ({ url: '/api/comments', method: 'POST', body }),
      invalidatesTags: (_result, _err, arg) => ['Comments'],
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
} = api;
