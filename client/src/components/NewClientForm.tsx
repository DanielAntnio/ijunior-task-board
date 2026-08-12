import { useRef, useState } from "react";
import { createClient } from "../services/clientService";
import type { Client } from "../types";
import { formatError } from "../utils/error";

interface Props {
  addClient: (newClient: Client) => void;
  setError: (message: string) => void;
}

const NewSClientForm = ({ addClient, setError }: Props) => {
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  async function submitOrder(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const name = nameRef.current?.value.trim();
      if (!name) throw new Error("O campo nome é obrigatório");

      const phone = phoneRef.current?.value.trim();
      if (!phone) throw new Error("O campo telefone é obrigatório");

      const email = emailRef.current?.value.trim();
      if (!email) throw new Error("O campo email é obrigatório");

      const newClient = await createClient({
        name,
        phone,
        email,
      });

      addClient(newClient);
    } catch (err) {
      setError(formatError(err, "Ocorreu um erro ao enviar o formulário"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submitOrder} className="flex flex-col gap-2">
      <input
        type="text"
        ref={nameRef}
        placeholder="Nome"
        className="border rounded-md px-1 bg-white text-black"
        required
      />
      <input
        type="tel"
        ref={phoneRef}
        placeholder="Telefone"
        className="border rounded-md px-1 bg-white text-black"
        required
      />
      <input
        type="email"
        ref={emailRef}
        placeholder="Email"
        className="border rounded-md px-1 bg-white text-black"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 rounded-md text text-slate-100 py-1 hover:cursor-pointer"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

export default NewSClientForm;
