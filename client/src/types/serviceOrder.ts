export type ServiceOrderStatus = "open" | "in_progress" | "done";

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
