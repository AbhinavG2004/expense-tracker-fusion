
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
      <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-white">
        <div className="container max-w-4xl mx-auto py-8 px-4">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold font-satoshi mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600">Expense Tracker</h1>
            <p className="text-purple-500">Track your spending, gain financial clarity.</p>
          </header>
          
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 bg-purple-100">
                <TabsTrigger value="list" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-600 data-[state=active]:text-white">
                  <ListChecks className="h-4 w-4" />
                  Expenses
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-600 data-[state=active]:text-white">
                  <BarChart2 className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="ml-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-md hover:shadow-lg transition-all">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gradient-to-br from-white to-purple-50">
                <DialogHeader>
                  <DialogTitle className="text-purple-800">Add New Expense</DialogTitle>
                  <DialogDescription className="text-purple-500">Fill out the form below to add a new expense to your tracker.</DialogDescription>
                </DialogHeader>
                <ExpenseForm onSubmit={() => setShowAddDialog(false)} />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="mt-6">
            {activeTab === 'list' && (
              <div className="bg-gradient-to-br from-white to-purple-50 rounded-lg shadow-sm p-6 border border-purple-100">
                <ExpenseList />
              </div>
            )}
            
            {activeTab === 'dashboard' && (
              <div className="bg-gradient-to-br from-white to-purple-50 rounded-lg shadow-sm p-6 border border-purple-100">
                <Dashboard />
              </div>
            )}
          </div>
          
          <footer className="mt-10 text-center text-sm bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
            <p>© {new Date().getFullYear()} Expense Tracker Fusion • Built with 💜</p>
          </footer>
        </div>
      </div>
    </ExpenseProvider>
  );
};

export default Index;
