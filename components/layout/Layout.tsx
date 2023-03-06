import { FC, ReactNode } from 'react';
import Header from './Header';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='container pt-44'>{children}</main>
    </>
  );
};

export default Layout;
