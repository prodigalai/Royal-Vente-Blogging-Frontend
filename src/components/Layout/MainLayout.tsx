import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const MainLayout: React.FC = () => {
 const location = useLocation();
  const isCreatePage = location.pathname === "/create";
  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
      {!isCreatePage && (
        <Header />    
      )}      
      <div className="flex flex-1 overflow-hidden">
        {/* <div className="w-16 shrink-0 border-r border-gray-200 dark:border-gray-800">
          <Sidebar />
        </div> */}
        {!isCreatePage && (
          <div className="w-16 shrink-0 border-r border-gray-200 dark:border-gray-800">
            <Sidebar />
          </div>
        )}


        <main className="flex-1 overflow-y-auto">
          {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> */}
          <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isCreatePage ? '' : 'py-8'}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
