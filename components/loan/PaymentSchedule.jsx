"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PaymentSchedule({ loanData }) {
    if (!loanData) return null;

    const {
        loanAmount,
        interest,
        installmentAmount,
        totalInstallment,
        emiHistory,
    } = loanData;

    const interestRate = parseFloat(interest); // Convert interest to number
    const totalInstallments = parseInt(totalInstallment, 10); // Convert to number
    const installmentAmountNum = parseFloat(installmentAmount); // Ensure this is a number

    let beginningBalance = parseFloat(loanAmount);

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Filter" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-sm text-gray-500">
                            Page 1 of 1
                        </span>
                        <span className="text-sm text-gray-500">
                            Total: {totalInstallments} months
                        </span>
                    </div>
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                    </Button>
                </div>
                <div className="rounded-md border w-full h-[35vh] overflow-y-auto">
                    <Table className="">
                        <TableHeader>
                            <TableRow className="sticky top-0 z-10 bg-white">
                                <TableHead className="w-[50px]">#</TableHead>
                                <TableHead>Installment Date</TableHead>
                                <TableHead>Beginning Balance</TableHead>
                                <TableHead>Principal</TableHead>
                                <TableHead>Interest</TableHead>
                                <TableHead>Total Pay</TableHead>
                                <TableHead>Penalty</TableHead>
                                <TableHead>Closing Balance</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {emiHistory.map((row, index) => {
                                const installmentDate = new Date(row.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                });

                                const principal = installmentAmountNum; // Principal amount
                                const interestAmount = (loanAmount * interestRate) / 100; // Calculate interest
                                const totalPay = principal + interestAmount; // Total payment
                                const closingBalance = beginningBalance - principal; // Closing balance
                                const status = row.paidDate ? "Paid" : "Pending";

                                const tableRow = (
                                    <TableRow key={row._id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className="text-blue-600">{installmentDate}</TableCell>
                                        <TableCell>{beginningBalance.toFixed(2)}</TableCell>
                                        <TableCell>{principal.toFixed(2)}</TableCell>
                                        <TableCell>{interestAmount.toFixed(2)}</TableCell>
                                        <TableCell>{totalPay.toFixed(2)}</TableCell>
                                        <TableCell>--</TableCell>
                                        <TableCell>{closingBalance.toFixed(2)}</TableCell>
                                        <TableCell>
                                            {status === "Paid" ? (
                                                <span className="text-green-600">Paid</span>
                                            ) : (
                                                <span className="text-orange-500">Pending</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );

                                beginningBalance = closingBalance; // Update balance for the next iteration
                                return tableRow;
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card >
    );
}
