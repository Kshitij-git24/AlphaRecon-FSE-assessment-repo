export interface User {
  id: number;
  name: string;
  email: string;
  note: string | null;
}

export interface UserPayload {
  name: string;
  email: string;
  note?: string;
}
