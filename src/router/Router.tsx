import { createBrowserRouter } from 'react-router-dom';

import { RequireAuth, RequireRole } from './guards/guards';
import App from '../App';
import AccountPage from '../pages/AccountPage/AccountPage';
import AuthenticationPage from '../pages/AuthenticationPage/AuthenticationPage';
import CreateSnippetPage from '../pages/CreateSnippetPage/CreateSnippetPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import HomePage from '../pages/HomePage/HomePage';
import MySnippetsPage from '../pages/MySnippetsPage/MySnippetsPage';
import PostPage from '../pages/PostPage/PostPage';
import QuestionsPage from '../pages/QuestionPage/QuestionPage';
import UsersPage from '../pages/UsersPage/UsersPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <AuthenticationPage />,
      },
      {
        path: '/snippet/:id',
        element: <PostPage />,
      },
      {
        path: '/questions',
        element: <QuestionsPage />,
      },
      {
        element: <RequireAuth />,
        children: [
          { path: '/account', element: <AccountPage /> },
          { path: '/create-snippet', element: <CreateSnippetPage /> },
          { path: '/my-snippets', element: <MySnippetsPage /> },

          {
            element: <RequireRole allowed={['admin']} />,
            children: [{ path: '/users', element: <UsersPage /> }],
          },
        ],
      },
    ],
  },
]);
