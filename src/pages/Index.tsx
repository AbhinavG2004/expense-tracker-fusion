
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { PlusCircle, BarChart2, ListChecks } from 'lucide-react';
import { ExpenseProvider } from '@/context/ExpenseContext';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="container max-w-4xl mx-auto py-8 px-4">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold font-satoshi mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Expense Tracker</h1>
            <p className="text-indigo-500">Track your spending, gain financial clarity.</p>
          </header>
          
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-indigo-100">
                <TabsTrigger value="list" className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  <ListChecks className="h-4 w-4" />
                  Expenses
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                  <BarChart2 className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-indigo-100">
                  <ExpenseList />
                </div>
              </TabsContent>
              
              <TabsContent value="dashboard" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-indigo-100">
                  <Dashboard />
                </div>
              </TabsContent>
            </Tabs>
            
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="ml-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-indigo-800">Add New Expense</DialogTitle>
                  <DialogDescription className="text-indigo-500">Fill out the form below to add a new expense to your tracker.</DialogDescription>
                </DialogHeader>
                <ExpenseForm onSubmit={() => setShowAddDialog(false)} />
              </DialogContent>
            </Dialog>
          </div>
          
          <footer className="mt-10 text-center text-sm text-indigo-400">
            <p>© {new Date().getFullYear()} Expense Tracker Fusion • Built with 💙</p>
          </footer>
        </div>
      </div>
    </ExpenseProvider>
  );
};

export default Index;
