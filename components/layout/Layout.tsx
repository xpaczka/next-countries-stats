import { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <main className='container'>{children}</main>;
};

export default Layout;
