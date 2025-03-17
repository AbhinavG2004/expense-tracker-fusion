
import React from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import ExpenseCard from './ExpenseCard';
import { ScrollArea } from '@/components/ui/scroll-area';

const ExpenseList: React.FC = () => {
  const { expenses } = useExpenses();
  
  if (expenses.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No expenses yet. Add one to get started!</p>
      </div>
    );
  }
  
  // Sort expenses by date, newest first
  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-2">
        {sortedExpenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ExpenseList;
