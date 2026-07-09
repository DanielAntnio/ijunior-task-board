import { useState } from "react";
import Header from "./components/Header";
import NewServiceForm from "./components/NewServiceForm";
import ServiceCard from "./components/ServiceCard";
import type serviceOrder from "./types";

export default function App() {
  const [orders, setOrders] = useState<serviceOrder[]>([]);

  return (
    <>
      <Header />
      <main className="grow px-4 py-2 bg-slate-100 dark:bg-slate-800">
        <section>
          <NewServiceForm
            addOrder={(newOrder: serviceOrder) =>
              setOrders((prev) => [...prev, newOrder])
            }
          />
        </section>
        <section className="mt-4">
          <ul className="flex flex-row overflow-x-auto scroll-smooth scrollbar-none gap-y-2 gap-x-4">
            {orders.map((order, pos) => (
              <ServiceCard {...order} key={pos} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
