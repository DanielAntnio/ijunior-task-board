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
    async function load() {
      const ordersData = await getAllServiceOrders();
      setOrders(ordersData);

      const clientsData = await getAllClients();
      setClients(clientsData);

      setLoading(false);
    }

    load();
  }, []);

  return <OrdersList loading={loading} clients={clients} orders={orders} />;
};

export default DashboardPage;
