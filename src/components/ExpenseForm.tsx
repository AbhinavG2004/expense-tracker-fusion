
import React from 'react';
import { useForm } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useExpenses } from '@/context/ExpenseContext';
import { Expense } from '@/types/expense';

interface ExpenseFormProps {
  onSubmit?: () => void;
  editExpense?: Expense;
  isEditing?: boolean;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ 
  onSubmit, 
  editExpense, 
  isEditing = false 
}) => {
  const { categories, addExpense, updateExpense } = useExpenses();
  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm<Expense>({
    defaultValues: editExpense || {
      description: '',
      amount: 0,
      category: '',
      date: format(new Date(), 'yyyy-MM-dd')
    }
  });
  
  const selectedDate = watch('date');
  
  const handleFormSubmit = (data: Expense) => {
    if (isEditing && editExpense?.id) {
      updateExpense(editExpense.id, data);
    } else {
      addExpense(data);
    }
    
    reset();
    if (onSubmit) onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="description" className="text-indigo-700">Description</Label>
        <Input
          id="description"
          placeholder="What did you spend on?"
          {...register('description', { required: 'Description is required' })}
          className="w-full border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.description && (
          <p className="text-rose-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-indigo-700">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register('amount', { 
            required: 'Amount is required', 
            valueAsNumber: true,
            min: { value: 0.01, message: 'Amount must be greater than 0' }
          })}
          className="w-full border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.amount && (
          <p className="text-rose-500 text-sm">{errors.amount.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category" className="text-indigo-700">Category</Label>
        <Select 
          defaultValue={editExpense?.category || ''}
          onValueChange={(value) => setValue('category', value)}
        >
          <SelectTrigger className="border-indigo-200 focus:ring-indigo-500">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  {category.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-rose-500 text-sm">{errors.category.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="date" className="text-indigo-700">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal border-indigo-200 hover:bg-indigo-50"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-indigo-500" />
              {selectedDate ? format(new Date(selectedDate), 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate ? new Date(selectedDate) : undefined}
              onSelect={(date) => setValue('date', format(date || new Date(), 'yyyy-MM-dd'))}
              initialFocus
              className="border-indigo-200"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
        {isEditing ? 'Update Expense' : 'Add Expense'}
      </Button>
    </form>
  );
};

export default ExpenseForm;
