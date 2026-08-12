import { useRef } from "react";
import type { Client, ServiceOrder, ServiceOrderStatus } from "../types";
import { createServiceOrder } from "../services/serviceOrderService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { formatError } from "../utils/error";

interface Props {
  addOrder: (newOrder: ServiceOrder) => void;
  setError: (message: string) => void;
  clients: Client[];
}

const PossibleStatus: ServiceOrderStatus[] = ["open", "in_progress", "done"];

const NewServiceForm = ({ addOrder, setError, clients }: Props) => {
  const clientIdRef = useRef<HTMLSelectElement | null>(null);
  const deviceRef = useRef<HTMLInputElement | null>(null);
  const issueRef = useRef<HTMLTextAreaElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  async function submitOrder(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const client_id = Number(clientIdRef.current?.value);
      if (isNaN(client_id))
        throw new Error("É necessário selecionar um cliente válido.");

      const device = deviceRef.current?.value.trim();
      if (device === undefined || device === "")
        throw new Error("O campo dispositivo é obrigatório.");

      const issue = issueRef.current?.value.trim();
      if (issue === undefined || issue === "")
        throw new Error("O campo defeito é obrigatório.");

      const status = statusRef.current?.value.trim();
      if (
        status === undefined ||
        !(PossibleStatus as string[]).includes(status)
      )
        throw new Error("O campo status é obrigatório.");

      const newOrder = await createServiceOrder({
        client_id,
        device,
        issue,
        status: status as ServiceOrderStatus,
        created_by: user.id,
      });

      addOrder(newOrder);
    } catch (err) {
      setError(formatError(err, "Ocorreu um erro ao enviar o formulário"));
    }
  }

  return (
    <form onSubmit={submitOrder} className="flex flex-col gap-2">
      <select
        name="client_id"
        ref={clientIdRef}
        className="border rounded-md px-1 bg-white text-black"
        defaultValue=""
      >
        <option value="" disabled hidden key={0}>
          Selecione o cliente
        </option>
        {clients.map((client, pos) => (
          <option value={client.id} key={pos}>
            {client.name} ({client.email})
          </option>
        ))}
      </select>
      <input
        type="text"
        ref={deviceRef}
        placeholder="Digite o modelo do seu aparelho"
        className="border rounded-md px-1 bg-white text-black"
        required
      />
      <textarea
        maxLength={500}
        rows={3}
        ref={issueRef}
        placeholder="Descreva o defeito (maximo de 500 carácteres)"
        className="border rounded-md px-1 bg-white text-black resize-none"
        required
      />
      <select
        name="status"
        ref={statusRef}
        className="border rounded-md px-1 bg-white text-black"
        defaultValue=""
      >
        <option value="" disabled hidden key={0}>
          Selecione o status
        </option>
        {PossibleStatus.map((possibleStatus, pos) => (
          <option value={possibleStatus} key={pos}>
            {possibleStatus}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 rounded-md text text-slate-100 py-1 hover:cursor-pointer"
      >
        Salvar
      </button>
    </form>
  );
};

export default NewServiceForm;
