import { useState } from "react";
import Header from "./components/Header";
import NewServiceForm from "./components/NewServiceForm";
import ServiceCard from "./components/ServiceCard";
import type serviceOrder from "./types";

const PossibleStatus = ["Pendente", "Processando", "Concluido"];

export default function App() {
  const [orders, setOrders] = useState<serviceOrder[]>([]);

  return (
    <>
      <Header />
      <main className="px-4 py-2">
        <section>
          <NewServiceForm
            addOrder={(newOrder: serviceOrder) =>
              setOrders((prev) => [...prev, newOrder])
            }
          />
        </section>

        {PossibleStatus.map((pStatus, pos) => {
          const ordersFiltered = orders.filter(
            (order) => order.status === pStatus,
          );

          if (ordersFiltered.length < 1) return;

          return (
            <section key={pos} className="mt-4">
              <h3 className="text-3xl mb-4">{pStatus}</h3>
              <ul className="flex flex-row overflow-x-auto scroll-smooth scrollbar-none gap-y-2 gap-x-4">
                {ordersFiltered.map((order, pos) => (
                  <ServiceCard {...order} key={pos} />
                ))}
              </ul>
            </section>
          );
        })}
      </main>
    </>
  );
}
