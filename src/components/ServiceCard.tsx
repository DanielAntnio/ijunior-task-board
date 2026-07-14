import { useEffect, useState } from "react";
import type { ServiceOrder } from "../types";
import { getClientById } from "../services/clientService";

type Props = ServiceOrder;

export default function ServiceCard({ client_id, device, issue, status}: Props) {
  const [ name, setName ] = useState("...")

  useEffect(() => {
    async function load() {
      const data = await getClientById(client_id);
      setName(data.name ?? "Sem nome");
    }

    load();
  }, [])

  return (
    <li className={`flex flex-col items-center p-4 border dark:border-black rounded-md
      ${status === "done" ? "bg-green-400" : "bg-gray-400 opacity-80"}
    `}>
      <h4 className="font-bold text-wrap text-center text-xl mb-2">{name}</h4>
      <span className="italic underline mb-2">{device}</span>
      <p className="text-base text-center text-balance">{issue}</p>
    </li>
  );
}
