import type { ServiceOrder, UpdateServiceOrderData } from "../types";

type Props = Omit<
  ServiceOrder & {
    handleDelete?: (id: number) => Promise<void>;
    handleUpdate?: (id: number, data: UpdateServiceOrderData) => Promise<void>;
    name: string;
  },
  "created_at" | "client_id"
>;

const ServiceCard = ({
  name,
  id,
  device,
  issue,
  status,
  handleDelete,
  handleUpdate,
}: Props) => {
  return (
    <li
      className={`flex flex-col items-center p-4 border dark:border-black rounded-md
      ${status === "done" ? "bg-green-400" : status === "in_progress" ? "bg-amber-400" : "bg-red-400"}
    `}
    >
      <h4 className="font-bold text-wrap text-center text-xl mb-2">{name}</h4>
      <span className="italic underline mb-2">{device}</span>
      <p className="text-base text-center text-balance">{issue}</p>
      {handleUpdate !== undefined && (
        <button
          className="hover:cursor-pointer mt-2 bg-slate-50 px-2 rounded-md border"
          onClick={() =>
            handleUpdate(id, {
              status:
                status === "open"
                  ? "in_progress"
                  : status === "in_progress"
                    ? "done"
                    : "open",
            })
          }
        >
          Atualizar Status
        </button>
      )}
      {handleDelete !== undefined && (
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
