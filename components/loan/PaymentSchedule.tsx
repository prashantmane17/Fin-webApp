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
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const scheduleData = [
  {
    id: 1,
    date: "30-Nov-2024",
    beginningBalance: 30000.00,
    principal: 5650.64,
    interest: 900.00,
    totalPay: 6550.64,
    status: "Paid",
    penalty: 1000.00,
    closingBalance: 24349.36,
    due: 6550.64
  },
  {
    id: 2,
    date: "30-Dec-2024",
    beginningBalance: 24349.36,
    principal: 5820.15,
    interest: 730.48,
    totalPay: 6550.63,
    status: "Paid",
    penalty: 0.00,
    closingBalance: 18529.20,
    due: 6550.64
  },
  {
    id: 3,
    date: "30-Jan-2025",
    beginningBalance: 18529.20,
    principal: 5994.76,
    interest: 555.88,
    totalPay: 6550.63,
    status: "Pending",
    penalty: null,
    closingBalance: 12534.45,
    due: null
  },
  {
    id: 4,
    date: "28-Feb-2025",
    beginningBalance: 12534.45,
    principal: 6174.60,
    interest: 376.03,
    totalPay: 6550.64,
    status: "Pending",
    penalty: null,
    closingBalance: 6359.84,
    due: null
  },
  {
    id: 5,
    date: "28-Mar-2025",
    beginningBalance: 6359.84,
    principal: 6359.84,
    interest: 190.80,
    totalPay: 6550.64,
    status: "Pending",
    penalty: null,
    closingBalance: 0.00,
    due: null
  }
];

export function PaymentSchedule() {
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
              Total: 5 months
            </span>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Installment Date</TableHead>
                <TableHead>Beginning Balance</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Total Pay</TableHead>
                <TableHead>Penalty</TableHead>
                <TableHead>Closing Balance</TableHead>
                <TableHead>Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduleData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell className="text-blue-600">{row.date}</TableCell>
                  <TableCell>{row.beginningBalance.toFixed(2)}</TableCell>
                  <TableCell>{row.principal.toFixed(2)}</TableCell>
                  <TableCell>{row.interest.toFixed(2)}</TableCell>
                  <TableCell>
                    {row.totalPay.toFixed(2)}
                    {row.status === "Paid" && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Paid
                      </span>
                    )}
                    {row.status === "Pending" && (
                      <Button size="sm" variant="secondary" className="ml-2">
                        Pay
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{row.penalty?.toFixed(2) ?? "--"}</TableCell>
                  <TableCell>{row.closingBalance.toFixed(2)}</TableCell>
                  <TableCell>
                    {row.status === "Paid" ? (
                      <span className="text-green-600">{row.due?.toFixed(2)}</span>
                    ) : (
                      <span className="text-orange-500">Pending</span>
                    )}
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