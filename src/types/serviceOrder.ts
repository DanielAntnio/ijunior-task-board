export type ServiceOrderStatus = "open" | "in_progress" | "done";

export interface ServiceOrder {
  id: number;
  client_id: number;
  device: string;
  issue: string;
  status: ServiceOrderStatus;
  created_at: string;
}

export type CreateServiceOrderData = Omit<
  ServiceOrder & { clientId: number },
  "client_id" | "id" | "created_at"
>;
