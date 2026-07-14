import { useRef } from "react";
import type { ServiceOrderStatus } from "../types";
import { createServiceOrder } from "../services/serviceOrderService";

interface Props {
  reRender: () => void;
}
const PossibleStatus: ServiceOrderStatus[] = ["done", "in_progress", "open"];

export default function NewServiceForm({ reRender }: Props) {
  const clientIdRef = useRef<HTMLInputElement | null>(null);
  const deviceRef = useRef<HTMLInputElement | null>(null);
  const issueRef = useRef<HTMLTextAreaElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);

  function submitOrder(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const client_id = Number(clientIdRef.current?.value);
    if (isNaN(client_id)) return;

    const device = deviceRef.current?.value.trim();
    if (device === undefined || device === "") return;

    const issue = issueRef.current?.value.trim();
    if (issue === undefined || issue === "") return;

    const status = statusRef.current?.value.trim();
    if (status === undefined || status === "") return;

    createServiceOrder({
      client_id,
      device,
      issue,
      status: status as ServiceOrderStatus,
    });

    reRender();
  }

  return (
    <form onSubmit={submitOrder} className="flex flex-col gap-2">
      <input
        type="number"
        name="clientId"
        ref={clientIdRef}
        placeholder="Digite seu nome"
        className="border rounded-md px-1 bg-white text-black"
      />
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
        className="bg-blue-500 rounded-md text text-slate-100 py-1"
      >
        Salvar
      </button>
    </form>
  );
}
