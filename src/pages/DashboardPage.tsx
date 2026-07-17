import { useEffect, useState } from "react";
import { getAllServiceOrders } from "../services/serviceOrderService";
import { getAllClients } from "../services/clientService";
import type { Client, ServiceOrder } from "../types";
import OrdersList from "../components/OrdersList";

const DashboardPage = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadServices() {
      const data = await getAllServiceOrders();
      setOrders(data);
    }

    async function loadClients() {
      const data = await getAllClients();
      setClients(data);
    }

    loadServices();
    loadClients();
    setLoading(false);
  }, []);

  return <OrdersList loading={loading} clients={clients} orders={orders} />;
};

export default DashboardPage;
