
export interface User {
  id: string;
  username: string;
  password?: string;
  role: 'master' | 'atendente' | 'veterinario' | 'tosador';
  permissions: View[];
}

export interface Pet {
  id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Other';
  breed: string;
  age: number;
  tutor: string;
  mood: string;
  lastVisit: string;
  vaccines: { name: string; date: string; status: 'ok' | 'expired' }[];
  status: 'active' | 'grooming' | 'daycare' | 'clinic' | 'hospedagem';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  expiryDate?: string;
  price: number;
}

export enum View {
  Dashboard = 'dashboard',
  Pets = 'pets',
  Daycare = 'daycare',
  Hospedagem = 'hospedagem',
  Clinic = 'clinic',
  Grooming = 'grooming',
  POS = 'pos',
  Finance = 'finance',
  Inventory = 'inventory',
  Settings = 'settings',
  Users = 'users'
}

export type PaymentMethod = 'Dinheiro' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Pix' | 'Misto';
