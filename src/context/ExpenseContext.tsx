
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Expense, Category, defaultCategories } from '@/types/expense';
import { toast } from 'sonner';

interface ExpenseContextType {
  expenses: Expense[];
  categories: Category[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updatedExpense: Expense) => void;
  totalExpenses: number;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  
  const [categories] = useState<Category[]>(defaultCategories);
  
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
  
  const addExpense = (expense: Expense) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID()
    };
    setExpenses([...expenses, newExpense]);
    toast.success('Expense added successfully');
  };
  
  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast.success('Expense deleted successfully');
  };
  
  const updateExpense = (id: string, updatedExpense: Expense) => {
    setExpenses(
      expenses.map(expense => 
        expense.id === id ? { ...updatedExpense, id } : expense
      )
    );
    toast.success('Expense updated successfully');
  };
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  return (
    <ExpenseContext.Provider 
      value={{ 
        expenses, 
        categories, 
        addExpense, 
        deleteExpense, 
        updateExpense,
        totalExpenses
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
