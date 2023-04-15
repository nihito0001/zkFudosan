import React, { FC, ReactNode } from 'react';
import { Nav } from '../navbar/Nav';

type DefaultLayoutProps = {
  children: ReactNode;
};

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div>
      <Nav />
      <div>{children}</div>
    </div>
  );
};

export default DefaultLayout;
