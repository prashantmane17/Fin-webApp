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

// Helper function to format the date as '23 Jan 2025'
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

export function PaymentHistory({ loanData }) {
    const paidEMIs = loanData.emiHistory.filter(payment => payment.paidDate !== null);
    const totalPaid = paidEMIs.reduce((acc, payment) => acc + payment.amount, 0);

    const lastPaidAmount = paidEMIs.length > 0 ? paidEMIs[paidEMIs.length - 1].amount : 0;

    let nextDueDate = null;
    for (let payment of loanData.emiHistory) {
        if (payment.paidDate === null) {
            nextDueDate = payment.date;
            break;
        }
    }

    if (!nextDueDate && loanData.emiHistory.length > 0) {
        const lastPayment = loanData.emiHistory[loanData.emiHistory.length - 1];
        const nextMonth = new Date(lastPayment.dueDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextDueDate = nextMonth;
    }

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
                                <p className="text-2xl font-bold text-green-700">₹{totalPaid.toFixed(2)}</p>
                            </div>
                            <Badge variant="secondary" className="bg-green-100">{paidEMIs.length} Payments</Badge>
                        </div>
                    </Card>

                    <Card className="p-4 bg-blue-50">
                        <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-blue-600 font-medium">Last Payment</p>
                                <p className="text-lg font-semibold text-blue-700">₹{lastPaidAmount.toFixed(2)}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 bg-purple-50">
                        <div className="flex items-center gap-3">
                            <CalendarDays className="h-5 w-5 text-purple-600" />
                            <div>
                                <p className="text-sm text-purple-600 font-medium">Next Due Date</p>
                                <p className="text-lg font-semibold text-purple-700">{formatDate(nextDueDate)}</p>
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
                            {loanData.emiHistory.map((payment) => (
                                <TableRow key={payment._id}>
                                    <TableCell className="font-medium">{formatDate(payment.date)}</TableCell>
                                    <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                                    <TableCell>---</TableCell>
                                    <TableCell>₹{Number(loanData.installmentAmount).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                                            {payment.paidDate ? 'Paid' : 'Pending'}
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
