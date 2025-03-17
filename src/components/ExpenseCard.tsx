
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
    <Card className="w-full mb-3 overflow-hidden hover:shadow-md transition-all bg-gradient-to-r from-white to-purple-50 border-l-4" style={{ borderLeftColor: categoryColor }}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-3" 
              style={{ backgroundColor: categoryColor }}
            ></div>
            <div>
              <h3 className="font-satoshi font-medium text-lg text-purple-800">{expense.description}</h3>
              <p className="text-purple-600 text-sm">
                {expense.category} • {format(new Date(expense.date), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <p className="font-satoshi font-bold text-lg mr-4 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              ₹{expense.amount.toFixed(2)}
            </p>
            
            <div className="flex space-x-1">
              <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-purple-100">
                    <Edit className="h-4 w-4 text-purple-600" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-br from-white to-purple-50">
                  <DialogHeader>
                    <DialogTitle className="text-purple-800">Edit Expense</DialogTitle>
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
                className="h-8 w-8 text-rose-500 hover:bg-rose-100"
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
