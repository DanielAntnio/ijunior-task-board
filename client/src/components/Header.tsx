import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  return (
    <header className="inline-flex gap-4 bg-slate-200 dark:bg-slate-900 text-black dark:text-white px-2 py-0.5">
      <h1 className="font-bold mr-auto">iRepair</h1>
      <nav className="inline-flex flex-wrap justify-end gap-3">
        <Link to="/">Dashboard</Link>
        <Link to="/clients">Clientes</Link>
        <Link to="/service-orders">Ordens de Serviço</Link>
      </nav>
      <button className="justify-self-end cursor-pointer" onClick={logout}>
        LogOut
      </button>
    </header>
  );
};

export default Header;
