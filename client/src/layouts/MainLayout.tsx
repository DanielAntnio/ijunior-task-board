import { Outlet } from "react-router";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="w-full h-dvh flex flex-col">
      <Header />
      <main className="flex flex-col h-max grow px-4 py-2 bg-slate-100 dark:bg-slate-800 *:not-last:mb-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
