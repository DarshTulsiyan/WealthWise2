// "use client"

// import React, { useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import ExpensesComparison from '../../components/ExpensesComparison';
// import ExpensesBreakdown from '../../components/ExpensesBreakdown';
// import AddExpenseModal from '../../components/AddExpenseModal';
// import { Button } from '../../components/ui/button';

// export default function WealthWise() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleAddExpense = () => {
//     setIsModalOpen(true);
//   };

//   const handleSaveExpense = async (newExpense) => {
//     const userId = localStorage.getItem('userId'); 

//     try {
//       const response = await fetch('http://localhost:8000/api/expenses', { // Use the correct endpoint
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the JWT token in headers
//         },
//         body: JSON.stringify({
//           //user: userId, // Use actual user ID
//           categories: newExpense.categories, // Assuming newExpense contains categories
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         console.log('Expense added:', data);
//         // Optionally, trigger re-fetch or update local state
//       } else {
//         console.error('Failed to add expense:', data.message);
//       }
//     } catch (error) {
//       console.error('Error adding expense:', error);
//     } finally {
//       setIsModalOpen(false);
//     }
//   };


//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold">Expenses Comparison</h1>
//           <div className="space-x-4">
//             <Button variant="outline">SET BUDGET</Button>
//             <Button onClick={handleAddExpense}>+ ADD EXPENSE</Button>
//           </div>
//         </div>
//         <ExpensesComparison />
//         <ExpensesBreakdown />
//         <AddExpenseModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSaveExpense}
//         />
//       </main>
//     </div>
//   );
// }

"use client"

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ExpensesComparison from '../../components/ExpensesComparison';
import ExpensesBreakdown from '../../components/ExpensesBreakdown';
import AddExpenseModal from '../../components/AddExpenseModal';
import { Button } from '../../components/ui/button';

export default function WealthWise() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExpense = () => {
    setIsModalOpen(true);
  };

  const handleSaveExpense = async (newExpense) => {
    const userId = localStorage.getItem('userId'); 
  
    try {
      // Fetch current expense data for the user
      const response = await fetch(`http://localhost:8000/api/expenses/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
  
      // Find the category and update its total
      let category = data.categories.find(cat => cat.name === newExpense.categoryName);
      if (!category) {
        // If category doesn't exist, create it
        category = { name: newExpense.categoryName, amount: 0, items: [] };
        data.categories.push(category);
      }
  
      // Add new expense amount to category total
      category.amount += newExpense.amount;
  
      // Add the new expense to the items array for that category
      category.items.push({
        name: newExpense.name,
        amount: newExpense.amount,
        date: newExpense.date,
      });
  
      // Send updated category data to the backend
      const updatedExpenseData = {
        categories: data.categories,
      };
  
      const updateResponse = await fetch(`http://localhost:8000/api/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedExpenseData),
      });
  
      if (updateResponse.ok) {
        console.log('Expense updated successfully');
      } else {
        console.error('Failed to update expense:', await updateResponse.json());
      }
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Expenses Comparison</h1>
          <div className="space-x-4">
            <Button variant="outline">SET BUDGET</Button>
            <Button onClick={handleAddExpense}>+ ADD EXPENSE</Button>
          </div>
        </div>
        <ExpensesComparison />
        <ExpensesBreakdown />

        {/* Modal Component */}
        <AddExpenseModal
          isOpen={isModalOpen} // This controls whether the modal is visible
          onClose={() => setIsModalOpen(false)} // Close the modal when the user cancels
          onSave={handleSaveExpense} // Save expense data
        />
      </main>
    </div>
  );
}
