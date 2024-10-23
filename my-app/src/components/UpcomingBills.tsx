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
import Link from 'next/link';

export default function UpcomingBills() {
  const bills = [
    { description: "Jio sim - Yearly Plan", dueDate: "19th Nov",  },
    { description: "Spotify family - Yearly Plan", dueDate: "12th Sep" },
    { description: "Netflix UHD - Monthly Plan", dueDate: "31st Aug" },
  ];

  return (
    <Link href='/bills'>
    <Card className="cursor-pointer">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Bills</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map((bill, index) => (
              <TableRow key={index}>
                <TableCell>{bill.description}</TableCell>
                <TableCell>{bill.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </Link>
  );
}
