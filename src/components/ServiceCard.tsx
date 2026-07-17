import type { ServiceOrder } from "../types";
import { deleteServiceOrder } from "../services/serviceOrderService";

type Props = Omit<
  ServiceOrder & {
    setOrders: React.Dispatch<React.SetStateAction<ServiceOrder[]>>;
    name: string;
    showButtons?: boolean;
  },
  "created_at" | "client_id"
>;

const ServiceCard = ({
  name,
  id,
  device,
  issue,
  status,
  showButtons = false,
  setOrders,
}: Props) => {
  async function handleDelete(id: number) {
    await deleteServiceOrder(id);
    setOrders((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <li
      className={`flex flex-col items-center p-4 border dark:border-black rounded-md
      ${status === "done" ? "bg-green-400" : status === "in_progress" ? "bg-amber-400" : "bg-red-400"}
    `}
    >
      <h4 className="font-bold text-wrap text-center text-xl mb-2">{name}</h4>
      <span className="italic underline mb-2">{device}</span>
      <p className="text-base text-center text-balance">{issue}</p>
      {showButtons && (
        <button
          className="hover:cursor-pointer mt-2 bg-slate-50 px-2 rounded-md border"
          onClick={() => handleDelete(id)}
        >
          Excluir
        </button>
      )}
    </li>
  );
};

export default ServiceCard;
