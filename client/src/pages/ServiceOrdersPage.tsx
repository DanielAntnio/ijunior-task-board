import { useEffect, useState } from "react";
import NewServiceForm from "../components/NewServiceForm";
import type { Client, ServiceOrder } from "../types";
import {
  deleteServiceOrder,
  getAllServiceOrders,
} from "../services/serviceOrderService";
import { getAllClients } from "../services/clientService";
import OrdersList from "../components/OrdersList";
import ErrorComponent from "../components/ErrorComponent";
import { formatError } from "../utils/error";

const ServiceOrdersPage = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        const ordersData = await getAllServiceOrders();
        setOrders(ordersData);

        const clientsData = await getAllClients();
        setClients(clientsData);
      } catch (err) {
              setError(formatError(err, "Ocorreu um erro ao buscar dados na api"));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleDelete(id: number) {
    try {
      await deleteServiceOrder(id);
      setOrders((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(formatError(err));
    }
  }

  return (
    <>
      <NewServiceForm
        addOrder={(newOrder) => setOrders((prev) => [...prev, newOrder])}
        setError={(message) => setError(message)}
        clients={clients}
      />
      <OrdersList
        loading={loading}
        clients={clients}
        orders={orders}
        handleDelete={handleDelete}
      />
      {error && (
        <ErrorComponent error={error} closeError={() => setError("")} />
      )}
    </>
  );
};

export default ServiceOrdersPage;
