"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CreditCard } from "lucide-react";

const paymentHistory = [
  {
    id: 1,
    date: "30-Nov-2024",
    amount: 6550.64,
    method: "Credit Card",
    status: "Success",
    transactionId: "TXN123456789"
  },
  {
    id: 2,
    date: "30-Dec-2024",
    amount: 6550.63,
    method: "UPI",
    status: "Success",
    transactionId: "TXN987654321"
  }
];

export function PaymentHistory() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Payment History</h2>
          <p className="text-gray-500">View all your past payments and transactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-green-50">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Paid</p>
                <p className="text-2xl font-bold text-green-700">₹13,101.27</p>
              </div>
              <Badge variant="secondary" className="bg-green-100">2 Payments</Badge>
            </div>
          </Card>
          
          <Card className="p-4 bg-blue-50">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Last Payment</p>
                <p className="text-lg font-semibold text-blue-700">₹6,550.63</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-purple-50">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600 font-medium">Next Due Date</p>
                <p className="text-lg font-semibold text-purple-700">30-Jan-2025</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.date}</TableCell>
                  <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>₹{payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}