export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  created_at: Date | string | number;
}

export type CreateClientData = Omit<Client, "id" | "created_at">;

export type UpdateClientData = Partial<CreateClientData>;
