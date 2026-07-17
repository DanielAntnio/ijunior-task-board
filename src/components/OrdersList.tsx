import type { Client, ServiceOrder } from "../types";
import ServiceCard from "./ServiceCard";
import Loader from "./Loader";

interface Props {
  loading: boolean;
  clients: Client[];
  orders: ServiceOrder[];
  handleDelete?: (id: number) => Promise<void>;
}

const OrdersList = ({
  loading,
  clients = [],
  orders = [],
  handleDelete,
}: Props) => {
  if (loading) return <Loader />;

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-y-2 gap-x-4">
      {orders.map((order, pos) => (
        <ServiceCard
          {...order}
          name={
            clients.find((client) => client.id === order.client_id)?.name ?? ""
          }
          key={pos}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default OrdersList;
