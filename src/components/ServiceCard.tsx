import type serviceOrder from "../types";

type Props = serviceOrder;

export default function ServiceCard({ name, model, defect, status}: Props) {
  return (
    <li className={`flex flex-col items-center p-4 border dark:border-black rounded-md max-w-60
      ${status === "Aberto" ? "bg-green-400" : "bg-gray-400 opacity-80"}
    `}>
      <h4 className="font-bold text-wrap text-center text-xl mb-2">{name}</h4>
      <span className="italic underline mb-2">{model}</span>
      <p className="text-base text-center">{defect}</p>
    </li>
  );
}
