
import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Expense } from '@/types/expense';
import { useExpenses } from '@/context/ExpenseContext';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ExpenseForm from './ExpenseForm';

interface ExpenseCardProps {
  expense: Expense;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense }) => {
  const { deleteExpense, categories } = useExpenses();
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  
  const categoryColor = categories.find(c => c.name === expense.category)?.color || '#9CA3AF';
  
  return (
    <Card className="w-full mb-3">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-3" 
              style={{ backgroundColor: categoryColor }}
            ></div>
            <div>
              <h3 className="font-satoshi font-medium text-lg">{expense.description}</h3>
              <p className="text-muted-foreground text-sm">
                {expense.category} • {format(new Date(expense.date), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <p className="font-satoshi font-bold text-lg mr-4">
              ${expense.amount.toFixed(2)}
            </p>
            
            <div className="flex space-x-1">
              <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Expense</DialogTitle>
                  </DialogHeader>
                  <ExpenseForm 
                    editExpense={expense} 
                    isEditing={true} 
                    onSubmit={() => setShowEditDialog(false)}
                  />
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-destructive"
                onClick={() => expense.id && deleteExpense(expense.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
