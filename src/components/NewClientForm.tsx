import { useRef } from "react";
import { createClient } from "../services/clientService";

interface Props {
  reRender: () => void;
}

export default function NewSClientForm({ reRender }: Props) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  function submitOrder(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = nameRef.current?.value.trim();
    if (name === undefined || name === "") return;

    const phone = phoneRef.current?.value.trim();
    if (phone === undefined || phone === "") return;

    const email = emailRef.current?.value.trim();
    if (email === undefined || email === "") return;

    createClient({
      name,
      phone,
      email,
    });

    reRender();
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
        className="bg-blue-500 rounded-md text text-slate-100 py-1"
      >
        Salvar
      </button>
    </form>
  );
}
