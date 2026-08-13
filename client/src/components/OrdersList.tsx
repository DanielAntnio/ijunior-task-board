import type { Client, ServiceOrder, UpdateServiceOrderData } from "../types";
import ServiceCard from "./ServiceCard";
import Loader from "./Loader";

interface Props {
  loading: boolean;
  clients: Client[];
  orders: ServiceOrder[];
  handleDelete?: (id: number) => Promise<void>;
  handleUpdate?: (id: number, data: UpdateServiceOrderData) => Promise<void>;
}

const OrdersList = ({
  loading,
  clients = [],
  orders = [],
  handleDelete,
  handleUpdate,
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
          handleUpdate={handleUpdate}
        />
      ))}
    </ul>
  );
};

export default OrdersList;
