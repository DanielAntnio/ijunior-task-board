import { useEffect, useState } from "react";
import NewServiceForm from "../components/NewServiceForm";
import ServiceCard from "../components/ServiceCard";
import type { ServiceOrder } from "../types";
import { getAllServiceOrders } from "../services/serviceOrderService";


export default function DashboardPage() {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [update, setUpdate] = useState<number>(0)

  useEffect(() => {
    async function load() {
        const data = await getAllServiceOrders()
        setOrders(data)
    }

    load()
  }, [update])

  return (
    <>
      <section>
        <NewServiceForm
          reRender={() =>
            setUpdate((prev) => prev + 1)
          }
        />
      </section>
      <section className="mt-4">
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-y-2 gap-x-4">
          {orders.map((order, pos) => (
            <ServiceCard {...order} key={pos} />
          ))}
        </ul>
      </section>
    </>
  );
}
