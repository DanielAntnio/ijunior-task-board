import { useRef } from "react";
import type {
  Client,
  CreateServiceOrderData,
  ServiceOrder,
  ServiceOrderStatus,
} from "../types";
import { createServiceOrder } from "../services/serviceOrderService";

interface Props {
  orderExists: (order: CreateServiceOrderData) => boolean;
  setOrders: React.Dispatch<React.SetStateAction<ServiceOrder[]>>;
  clients: Client[];
}
const PossibleStatus: ServiceOrderStatus[] = ["open", "in_progress", "done"];

const NewServiceForm = ({ orderExists, setOrders, clients }: Props) => {
  const clientIdRef = useRef<HTMLSelectElement | null>(null);
  const deviceRef = useRef<HTMLInputElement | null>(null);
  const issueRef = useRef<HTMLTextAreaElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);

  async function submitOrder(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const clientId = Number(clientIdRef.current?.value);
    if (isNaN(clientId)) return;

    const device = deviceRef.current?.value.trim();
    if (device === undefined || device === "") return;

    const issue = issueRef.current?.value.trim();
    if (issue === undefined || issue === "") return;

    const status = statusRef.current?.value.trim();
    if (status === undefined || !(PossibleStatus as string[]).includes(status))
      return;

    const newOrderData: CreateServiceOrderData = {
      clientId,
      device,
      issue,
      status: status as ServiceOrderStatus,
    };

    if (orderExists(newOrderData)) return;

    const newOrder = await createServiceOrder(newOrderData);
    setOrders((prev) => [...prev, newOrder]);
  }

  return (
    <form onSubmit={submitOrder} className="flex flex-col gap-2">
      <select
        name="clientId"
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
        name="device"
        ref={deviceRef}
        placeholder="Digite o modelo do seu aparelho"
        className="border rounded-md px-1 bg-white text-black"
      />
      <textarea
        maxLength={500}
        rows={3}
        name="issue"
        ref={issueRef}
        placeholder="Descreva o defeito (maximo de 500 carácteres)"
        className="border rounded-md px-1 bg-white text-black resize-none"
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
