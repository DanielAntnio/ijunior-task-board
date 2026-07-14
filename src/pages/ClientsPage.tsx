import { useEffect, useState } from 'react';
import { getAllClients, deleteClient } from '../services/clientService';
import type { Client } from '../types';
import NewClientForm from '../components/NewClientForm';

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [update, setUpdate] = useState<number>(0)


  useEffect(() => {
    async function load() {
      const data = await getAllClients();
      setClients(data);
    }

    load();
  }, [update]);

  async function handleDelete(id: number) {
    await deleteClient(id);
    setClients(prev => prev.filter(c => c.id !== id));
  }

  return (
    <>
    <NewClientForm reRender={() => setUpdate(prev => prev + 1)}/>
    <ul>
      {clients.map(client => (
        <li key={client.id}>
          {client.name}
          <button onClick={() => handleDelete(client.id)}>Excluir</button>
        </li>
      ))}
    </ul>
    </>
  );
};

export default ClientsPage