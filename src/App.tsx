import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import Header from "./components/Header";
import ClientsPage from "./pages/ClientsPage";
// import { ServiceOrdersPage } from "./pages/ServiceOrdersPage";

function MainLayout() {
  return (
    <div className="w-full h-dvh flex flex-col">
      <Header />
      <main className="grow px-4 py-2 bg-slate-100 dark:bg-slate-800">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          {/* <Route path="/service-orders" element={<ServiceOrdersPage />} /> */}
          <Route
            path="*"
            element={
              <h1 className="text-gray-900 dark:text-gray-100 self-center justify-self-center text-">
                Página não encontrada 💔
              </h1>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
