import { useState } from "react";
import type serviceOrder from "../types";

interface Props {
  addOrder: (newOrder: serviceOrder) => void;
}

const PossibleStatus = ["Aberto", "Fechado"];

export default function NewServiceForm({ addOrder }: Props) {
  const [name, setName] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [defect, setDefect] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  function submitOrder(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name === "" || model === "" || defect === "" || status === "") return;

    addOrder({
      name,
      model,
      defect,
      status,
    });
  }

  return (
    <form onSubmit={submitOrder} className="flex flex-col gap-2">
      <input
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome"
        className="border rounded-md px-1"
      />
      <input
        type="text"
        name="model"
        onChange={(e) => setModel(e.target.value.trim())}
        placeholder="Digite o modelo do seu aparelho"
        className="border rounded-md px-1"
      />
      <input
        type="text"
        name="defect"
        onChange={(e) => setDefect(e.target.value.trim())}
        placeholder="Descreva o defeito"
        className="border rounded-md px-1"
      />
      <select
        name="state"
        onChange={(e) => setStatus(e.target.value.trim())}
        className="border rounded-md px-1"
        defaultValue=""
      >
        <option value="" disabled hidden key={0}>
          Selecione o status
        </option>
        {PossibleStatus.map((possibleStatus, pos) => (
          <option value={possibleStatus} key={pos + 1}>
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
