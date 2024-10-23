

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed with npm install axios
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Home, ShoppingBag, Car, Film, ShoppingCart, Package } from 'lucide-react';
// import { fetchExpenseData } from '@/app/expense/page';

// Define the category icons
const icons = {
  Housing: Home,
  Food: ShoppingBag,
  Transportation: Car,
  Entertainment: Film,
  Shopping: ShoppingCart,
  Others: Package,
};

// The function that fetches data from the backend
async function fetchExpenseData(userId) {
  console.log(userId); // Logs the userId for debugging purposes
  try {
    const response = await axios.get(`http://localhost:8000/api/expenses`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        userId: userId,
      },
    });

    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching expense data:', error);
    return null; // Return null in case of error
  }
}

export default function ExpensesBreakdown() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Assuming you're storing userId in localStorage

    const fetchData = async () => {
      try {
        const data = await fetchExpenseData(userId); // Fetch data using the provided function
        if (data && data.categories) {
          setCategories(data.categories);
        } else {
          setError('No expenses found for this user');
        }
      } catch (error) {
        setError('Error fetching expenses');
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, []);

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Expenses Breakdown</h2>
        <Tabs defaultValue="categorically">
          <TabsList>
            <TabsTrigger value="categorically">Categorically</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="categorically">
            {error ? (
              <p>{error}</p> // Display error if there is one
            ) : categories.length > 0 ? ( // Check if categories exist
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {categories.map((category, index) => {
                  const Icon = icons[category.name] || Package; // Fallback to Package if no icon is found
                  return (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Icon className="mr-2" size={20} />
                            <span className="font-semibold">{category.name}</span>
                          </div>
                          <span className="text-lg font-bold">${category.amount.toFixed(2)}</span>
                        </div>
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between items-center mb-2">
                            <span>{item.name}</span>
                            <div className="text-right">
                              <div>${item.amount.toFixed(2)}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(item.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <p>Loading expenses...</p> // Display loading message until data is fetched
            )}
          </TabsContent>
          <TabsContent value="monthly">
            {/* Add monthly breakdown content here */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}