import { useEffect, useState } from "react";
import ClientCard from "../components/ClientCard";
import NewClientForm from "../components/NewClientForm";
import { getAllClients, deleteClient } from "../services/clientService";
import {
  deleteServiceOrder,
  getAllServiceOrders,
} from "../services/serviceOrderService";
import Loader from "../components/Loader";
import type { Client, CreateClientData } from "../types";

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      const data = await getAllClients();
      setClients(data);
      setLoading(false);
    }

    load();
  }, []);

  async function handleDelete(id: number) {
    await deleteClient(id);
    setClients((prev) => prev.filter((c) => c.id !== id));

    const data = await getAllServiceOrders();
    const filteredData = data.filter((order) => order.client_id === id);
    filteredData.forEach(async (order) => {
      await deleteServiceOrder(order.id);
    });
  }

  function clientExists({ name, phone, email }: CreateClientData) {
    const client = clients.find(
      (client) =>
        client.name === name &&
        client.email === email &&
        client.phone === phone,
    );

    return client !== undefined;
  }

  return (
    <>
      <NewClientForm clientExists={clientExists} setClients={setClients} />
      {loading ? (
        <Loader />
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              {...client}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default ClientsPage;
