import { useEffect, useState } from "react";
import { getAllServiceOrders } from "../services/serviceOrderService";
import { getAllClients } from "../services/clientService";
import type { Client, ServiceOrder } from "../types";
import OrdersList from "../components/OrdersList";
import ErrorComponent from "../components/ErrorComponent";
import { formatError } from "../utils/error";

const DashboardPage = () => {
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

  return (
    <>
      <OrdersList loading={loading} clients={clients} orders={orders} />;
      {error && (
        <ErrorComponent error={error} closeError={() => setError("")} />
      )}
    </>
  );
};

export default DashboardPage;
