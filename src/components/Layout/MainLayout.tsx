//@ts-nocheck
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useLocation, Link } from 'react-router-dom';
import { PenTool, ArrowLeft } from 'lucide-react';
import { useSite } from '../../contexts/SiteContext';
import { useTheme } from '../../contexts/ThemeContext';

const MainLayout: React.FC = () => {
 const location = useLocation();
 const { site } = useSite();
 const { theme } = useTheme();
 const isCreatePage = location.pathname === "/create";

    if (isCreatePage) {
     return (
       <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
         <Header />
         <main className="pt-16">
           <Outlet />
         </main>
       </div>
     );
   }

 return (
   <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
     <Header />    
     <div className="flex flex-1 overflow-hidden">
       <div className="w-64 shrink-0 border-r border-gray-200 dark:border-gray-800">
         <Sidebar />
       </div>
       <main className="flex-1 overflow-y-auto">
         <div className="w-full px-6 py-8">
           <Outlet />
         </div>
       </main>
     </div>
   </div>
 );
};

export default MainLayout;
