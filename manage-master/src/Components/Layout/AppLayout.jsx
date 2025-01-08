import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const AppLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 ml-56 flex flex-col">
        <Header className="w-full top-0 left-0 z-10 sticky bg-white" />

        <main className="flex-1 p-4 bg-gray-50 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
