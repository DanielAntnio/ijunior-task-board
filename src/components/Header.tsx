import { Link } from "react-router";

export default function Header() {
  return (
    <header className="flex felx-row justify-between bg-slate-200 dark:bg-slate-900 px-2 py-0.5 max-h-8">
        <h1 className="text-gray-900 dark:text-gray-100 font-bold">iReapir</h1>
        <nav className="flex flex-row text-gray-900 dark:text-gray-100 gap-3">
          <Link to="/">Dashboard</Link>
          <Link to="/clients">Clientes</Link>
        <Link to="/service-orders">Ordens de Serviço</Link>
        </nav>
    </header>
  )
}
