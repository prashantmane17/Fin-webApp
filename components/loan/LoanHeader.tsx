"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function LoanHeader({ name, loanId }: { name: string; loanId: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          <span>Loans</span>
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{name}</h1>
          <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-md">
            Loan id :{loanId}
          </span>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">LOAN ID</div>
              <div className="font-semibold">{loanId}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">AMOUNT</div>
              <div className="font-semibold">₹ 30,000.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}