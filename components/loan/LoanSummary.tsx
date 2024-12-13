"use client";

import { Card, CardContent } from "@/components/ui/card";

export function LoanSummary() {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-gray-600 mb-1">Total loan amount</div>
            <div className="text-2xl font-bold">₹ 30,000.00</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Total repayment</div>
            <div className="text-2xl font-bold">₹ 33,753.19</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Outstanding balance</div>
            <div className="text-2xl font-bold">₹ -0.01</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">Loan term</div>
            <div className="text-2xl font-bold">5 months</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}