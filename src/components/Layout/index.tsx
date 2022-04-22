import React from 'react';
import Sidebar from '../Sidebar';

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div className='layout'>
      <Sidebar />

      {children}
    </div>
  )
}

export default Layout;