export interface User {
  id: string;
  name: string;
  photo_url: string;
  contact: Record<string, string>; // JSON campo
  email: string;
  priority: number;
  unit_id: string;
  position_id: string;
}

export interface Unit {
  id: string;
  name: string;
  description: string;
  floor: string;
}

export interface Position {
  id: string;
  name: string;
}
