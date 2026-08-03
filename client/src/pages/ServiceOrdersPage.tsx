import { useEffect, useState } from "react";
import NewServiceForm from "../components/NewServiceForm";
import type { Client, CreateServiceOrderData, ServiceOrder } from "../types";
import {
  deleteServiceOrder,
  getAllServiceOrders,
} from "../services/serviceOrderService";
import { getAllClients } from "../services/clientService";
import OrdersList from "../components/OrdersList";

const ServiceOrdersPage = () => {
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

  async function handleDelete(id: number) {
    await deleteServiceOrder(id);
    setOrders((prev) => prev.filter((c) => c.id !== id));
  }

  function orderExists({
    clientId,
    device,
    issue,
    status,
  }: CreateServiceOrderData) {
    const order = orders.find(
      (order) =>
        order.client_id === clientId &&
        order.device === device &&
        order.issue === issue &&
        order.status === status,
    );

    return order !== undefined;
  }

  return (
    <>
      <NewServiceForm
        orderExists={orderExists}
        setOrders={setOrders}
        clients={clients}
      />
      <OrdersList
        loading={loading}
        clients={clients}
        orders={orders}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default ServiceOrdersPage;
