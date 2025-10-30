import { Outlet } from 'react-router-dom';

import Header from './modules/Header/Header';

export default function App() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
}
