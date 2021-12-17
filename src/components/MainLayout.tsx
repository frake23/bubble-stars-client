import React from 'react';
import Header from './Header';

const MainLayout: React.FC = ({children}) => {
    return (
    <div className="min-h-screen">
      <Header/>
      {children}
    </div>
    )
}

export default MainLayout;
