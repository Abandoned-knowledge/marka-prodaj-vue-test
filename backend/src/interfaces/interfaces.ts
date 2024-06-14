export interface statusStorage {
  name: string;
  color: string;
}

export interface managerStorage {
  name: string;
}

export interface contactStorage {
  name?: string;
  phone?: string;
  email?: string;
}

export interface leadStorage {
  name?: string;
  price?: number;
  created_at?: number;
  pipeline_id?: number;
  status?: statusStorage;
  managerName?: string;
  contacts?: contactStorage;
}
