
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
  { id: '1', name: 'Food', color: '#4F46E5' },
  { id: '2', name: 'Transportation', color: '#10B981' },
  { id: '3', name: 'Entertainment', color: '#F59E0B' },
  { id: '4', name: 'Shopping', color: '#EC4899' },
  { id: '5', name: 'Utilities', color: '#6366F1' },
  { id: '6', name: 'Other', color: '#9CA3AF' },
];
