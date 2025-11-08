import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { store } from './app/store';
import { router } from './router/Router';
import { MyThemeProvider } from './UI';

export default function App() {
  return (
    <>
      <React.StrictMode>
        <Provider store={store}>
          <MyThemeProvider>
            <RouterProvider router={router} />
          </MyThemeProvider>
        </Provider>
      </React.StrictMode>
    </>
  );
}
