import Header from "./Header";
import RightSidebar from "./RightSidebar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export function SettingsLayout() {
  return (
    <div className="h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 py-8">
            <Outlet />
          </div>

          <aside className="hidden lg:block relative w-80">
            <RightSidebar
              type="help"              
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
