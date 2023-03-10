import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import Header from './Header';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useRouter();
  const isHomepage = pathname === '/';

  return (
    <>
      {isHomepage && <Header />}
      <main className={`container${isHomepage ? ' pt-48' : ''}`}>{children}</main>
    </>
  );
};

export default Layout;
