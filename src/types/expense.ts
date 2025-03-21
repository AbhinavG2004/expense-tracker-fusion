
export interface Expense {
  id?: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export const defaultCategories: Category[] = [
  { id: '1', name: 'Food', color: '#8B5CF6' }, // Vibrant Purple
  { id: '2', name: 'Transportation', color: '#10B981' }, // Emerald
  { id: '3', name: 'Entertainment', color: '#F59E0B' }, // Amber
  { id: '4', name: 'Shopping', color: '#EC4899' }, // Pink
  { id: '5', name: 'Utilities', color: '#3B82F6' }, // Blue
  { id: '6', name: 'Other', color: '#6366F1' }, // Indigo
];
