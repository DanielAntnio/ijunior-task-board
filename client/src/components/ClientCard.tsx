import type { Client } from "../types";

interface Props extends Omit<Client, "created_at"> {
  handleDelete: (id: number) => Promise<void>;
}

const ClientCard = ({ handleDelete, id, name, email, phone }: Props) => {
  return (
    <li
      className="relative p-4 bg-slate-300 dark:bg-slate-600 rounded-xl border grid grid-cols-2 justify-items-start text-black dark:text-white"
      key={id}
    >
      <h4>{name}</h4>
      <button
        className="hover:cursor-pointer justify-self-end row-span-2"
        onClick={() => handleDelete(id)}
      >
        Excluir
      </button>
      <button popoverTarget={`popup-${id}`} className="hover:cursor-pointer">
        Ver detalhes
      </button>
      <dialog
        className="open:flex flex-col backdrop:backdrop-blur-xs backdrop:backdrop-brightness-75 m-auto rounded-lg border p-4 bg-slate-100 text-black dark:bg-slate-800 dark:text-white"
        id={`popup-${id}`}
        popover="auto"
      >
        <h4>{name}</h4>
        <address className="flex flex-col">
          <a href={`mailto:${email}`}>email: {email}</a>
          <a href={`tel:+${phone}`}>tel: {phone}</a>
        </address>
      </dialog>
    </li>
  );
};

export default ClientCard;
