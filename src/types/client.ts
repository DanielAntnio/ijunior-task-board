export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  created_at: string;
}

// O que mandamos no corpo do POST (sem id e created_at, que são gerados pelo servidor)
export type CreateClientData = Omit<Client, 'id' | 'created_at'>;