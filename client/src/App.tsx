import { BrowserRouter, Routes, Route } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import ClientsPage from "./pages/ClientsPage";
import ServiceOrdersPage from "./pages/ServiceOrdersPage";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/service-orders" element={<ServiceOrdersPage />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <h1 className="text-gray-900 dark:text-gray-100 self-center justify-self-center text-">
                Página não encontrada 💔
              </h1>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
