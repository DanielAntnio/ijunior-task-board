import type { serviceOrderStatus } from "../utils/consts";

export type ServiceOrderStatus = (typeof serviceOrderStatus)[number];

export interface ServiceOrder {
  id: number;
  client_id: number;
  device: string;
  issue: string;
  status: ServiceOrderStatus;
  created_at: string;
  created_by: number;
}

export type CreateServiceOrderData = Omit<ServiceOrder, "id" | "created_at">;

export type UpdateServiceOrderData = Partial<CreateServiceOrderData>;
