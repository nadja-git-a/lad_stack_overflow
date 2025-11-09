import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from '../modules/Header/Header';

export default function RootLayout() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Outlet />
    </>
  );
}
