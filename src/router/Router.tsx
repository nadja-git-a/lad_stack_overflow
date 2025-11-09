import { createBrowserRouter } from 'react-router-dom';

import AccountPage from '../pages/AccountPage/AccountPage';
import AuthenticationPage from '../pages/AuthenticationPage/AuthenticationPage';
import CreateSnippetPage from '../pages/CreateSnippetPage/CreateSnippetPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import HomePage from '../pages/HomePage/HomePage';
import MySnippetsPage from '../pages/MySnippetsPage/MySnippetsPage';
import PostPage from '../pages/PostPage/PostPage';
import QuestionsPage from '../pages/QuestionPage/QuestionPage';
import UsersPage from '../pages/UsersPage/UsersPage';
import { RequireAuth, RequireRole } from './guards/guards';
import RootLayout from './RootLayout';

const routes = {
  home: '/',
  login: '/login',
  post: '/snippet/:id',
  myAccount: '/account',
  createSnippet: '/create-snippet',
  mySnippets: '/my-snippets',
  questions: '/questions',
  users: '/users',
} as const;

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.home,
        element: <HomePage />,
      },
      {
        path: routes.login,
        element: <AuthenticationPage />,
      },
      {
        path: routes.post,
        element: <PostPage />,
      },
      {
        path: routes.questions,
        element: <QuestionsPage />,
      },
      {
        element: <RequireAuth />,
        children: [
          { path: routes.myAccount, element: <AccountPage /> },
          { path: routes.createSnippet, element: <CreateSnippetPage /> },
          { path: routes.mySnippets, element: <MySnippetsPage /> },

          {
            element: <RequireRole allowed={['admin']} />,
            children: [{ path: routes.users, element: <UsersPage /> }],
          },
        ],
      },
    ],
  },
]);
