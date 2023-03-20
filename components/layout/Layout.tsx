import { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className='container'>{children}</div>;
};

export default Layout;
