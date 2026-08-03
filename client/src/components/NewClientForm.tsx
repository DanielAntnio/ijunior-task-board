import { useRef } from "react";
import { createClient } from "../services/clientService";
import type { Client, CreateClientData } from "../types";

interface Props {
  clientExists: (client: CreateClientData) => boolean;
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
}

const NewSClientForm = ({ clientExists, setClients }: Props) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  async function submitOrder(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = nameRef.current?.value.trim();
    if (name === undefined || name === "") return;

    const phone = phoneRef.current?.value.trim();
    if (phone === undefined || phone === "") return;

    const email = emailRef.current?.value.trim();
    if (email === undefined || email === "") return;

    const newClientData: CreateClientData = {
      name,
      phone,
      email,
    };

    if (clientExists(newClientData)) return;

    const newClient = await createClient(newClientData);
    setClients((prev) => [...prev, newClient]);
  }

  return (
    <form onSubmit={submitOrder} className="flex flex-col gap-2">
      <input
        type="text"
        name="name"
        ref={nameRef}
        placeholder="Digite seu nome"
        className="border rounded-md px-1 bg-white text-black"
      />
      <input
        type="tel"
        name="phone"
        ref={phoneRef}
        placeholder="Digite seu número de telefone"
        className="border rounded-md px-1 bg-white text-black"
      />
      <input
        type="email"
        name="email"
        ref={emailRef}
        placeholder="Digite seu email"
        className="border rounded-md px-1 bg-white text-black"
      />
      <button
        type="submit"
        className="bg-blue-500 rounded-md text text-slate-100 py-1 hover:cursor-pointer"
      >
        Salvar
      </button>
    </form>
  );
};

export default NewSClientForm;
