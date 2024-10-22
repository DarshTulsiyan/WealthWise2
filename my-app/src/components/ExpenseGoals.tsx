import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Home, Utensils, Plane, Film, ShoppingBag, Package } from 'lucide-react'

const expenseCategories = [
  { icon: Home, name: 'Housing', amount: 250 },
  { icon: Utensils, name: 'Food', amount: 250 },
  { icon: Plane, name: 'Travel', amount: 250 },
  { icon: Film, name: 'Entertainment', amount: 250 },
  { icon: ShoppingBag, name: 'Shopping', amount: 250 },
  { icon: Package, name: 'Others', amount: 250 },
]

export default function ExpenseGoals() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Expense Goals by Category</h2>
      <div className="grid grid-cols-3 gap-6">
        {expenseCategories.map((category, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex justify-between items-center">
              <div className="flex items-center">
                <category.icon className="mr-4 text-gray-500" size={24} />
                <div>
                  <p className="font-semibold">{category.name}</p>
                  <p className="text-2xl font-bold">${category.amount.toFixed(2)}</p>
                </div>
              </div>
              <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50">Adjust</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}