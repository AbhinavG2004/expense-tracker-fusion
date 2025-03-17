
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenses } from '@/context/ExpenseContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { expenses, categories, totalExpenses } = useExpenses();
  
  // Get current month expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  
  const currentMonthTotal = currentMonthExpenses.reduce(
    (sum, expense) => sum + expense.amount, 0
  );
  
  // Get category totals
  const categoryTotals = categories.map(category => {
    const total = expenses
      .filter(expense => expense.category === category.name)
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      name: category.name,
      value: total,
      color: category.color
    };
  }).filter(item => item.value > 0);
  
  // Calculate averages
  const today = new Date();
  const thisWeekExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const diffTime = today.getTime() - expenseDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  });
  
  const thisWeekTotal = thisWeekExpenses.reduce(
    (sum, expense) => sum + expense.amount, 0
  );
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold font-satoshi">${totalExpenses.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">All time</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Current Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold font-satoshi">${currentMonthTotal.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">{format(today, 'MMMM yyyy')}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Last 7 Days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold font-satoshi">${thisWeekTotal.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">Weekly average: ${(thisWeekTotal / 7).toFixed(2)}/day</p>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          {categoryTotals.length > 0 ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryTotals}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryTotals.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center py-10 text-muted-foreground">No data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
