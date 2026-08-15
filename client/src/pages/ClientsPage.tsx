import { useEffect, useState } from "react";
import ClientCard from "../components/ClientCard";
import NewClientForm from "../components/NewClientForm";
import { getAllClients, deleteClient } from "../services/clientService";
import Loader from "../components/Loader";
import type { Client } from "../types";
import ErrorComponent from "../components/ErrorComponent";
import { formatError } from "../utils/error";

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllClients();
        setClients(data);
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
      await deleteClient(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      setError(formatError(err, "Ocorreu um erro ao deletar um cliente"));
    }
  }

  return (
    <>
      <NewClientForm
        addClient={(NewClient) => setClients((prev) => [...prev, NewClient])}
        setError={(message) => setError(message)}
      />
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
      {error && (
        <ErrorComponent error={error} closeError={() => setError("")} />
      )}
    </>
  );
};

export default ClientsPage;
