import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingCart, Zap, Utensils, User } from "lucide-react";

export default function RecentExpenses() {
  const expenses = [
    {
      icon: ShoppingCart,
      receiver: "Tesco Market",
      type: "Shopping",
      date: "13 Aug 2024",
      amount: 75.67,
    },
    {
      icon: Zap,
      receiver: "ElectroMan Market",
      type: "Shopping",
      date: "10 Aug 2024",
      amount: 250.0,
    },
    {
      icon: Utensils,
      receiver: "Fiorgio Restaurant",
      type: "Food",
      date: "10 Aug 2024",
      amount: 19.5,
    },
    {
      icon: User,
      receiver: "John Mathew Kayne",
      type: "Sport",
      date: "9 Aug 2024",
      amount: 350,
    },
    {
      icon: ShoppingCart,
      receiver: "Ann Marlin",
      type: "Shopping",
      date: "7 Aug 2024",
      amount: 430,
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Receiver</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center">
                  <expense.icon className="mr-2" size={16} />
                  {expense.receiver}
                </TableCell>
                <TableCell>{expense.type}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell className="text-right">
                  ${expense.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
