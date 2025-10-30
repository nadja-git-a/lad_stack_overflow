import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import AccountPage from '../pages/AccountPage/AccountPage';
import AuthenticationPage from '../pages/AuthenticationPage/AuthenticationPage';
import HomePage from '../pages/HomePage/HomePage';
import PostPage from '../pages/PostPage/PostPage';

// import ErrorPage from '';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
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
        path: '/account',
        element: <AccountPage />,
      },
      {
        path: '/snippet/:id',
        element: <PostPage />,
      },
    ],
  },
]);

{
  /* <Route path="/my-snippets" element={<MySnippetsPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/users" element={<UsersPage />} /> */
}
