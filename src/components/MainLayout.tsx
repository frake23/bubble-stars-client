import React from 'react';
import Header from './Header';

const MainLayout: React.FC<{className?: string}> = ({children, className}) => {
    return (
    <div className={`min-h-screen ${className ? className : ''}`}>
      <Header/>
      {children}
    </div>
    )
}

export default MainLayout;
