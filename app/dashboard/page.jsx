"use client";

import { useState } from "react";
import {
  Wallet,
  PiggyBank,
  Percent,
  DollarSign,
  AlertCircle,
  IndianRupee,
  Receipt,
  HandCoins,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  monthlyData,
  distributionData,
  timeFilterOptions,
} from "@/lib/constants/dashboard-data";
import { LineChartCard } from "@/components/dashboard/analytics/line-chart";
import { PieChartCard } from "@/components/dashboard/analytics/pie-chart";
import { useInvestment } from "@/context/InvestmentContext";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState("this_year");
  const { investmentData, loading } = useInvestment();
  let investment = [];
  let withdraws = [];
  if (!loading) {
    console.log("inves----", investmentData);
    investment = investmentData.investments;
    withdraws = investmentData.withdrawals;
  }
  const totalInvestment = investment.reduce(
    (total, item) => total + parseInt(item.amount, 10),
    0
  );
  const totalWithdraws = withdraws.reduce(
    (total, item) => total + parseInt(item.amount, 10),
    0
  );
  return (
    <main className="min-h-screen bg-background p-8">
      <div className=" mx-auto space-y-8">
        {/* Header */}
        <div className="lg:flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className=" flex flex-wrap sm:flex-nowrap  items-center gap-2">
            <Select
              value={timeFilter}
              onValueChange={(value) => setTimeFilter(value)}
            >
              <SelectTrigger className="sm:w-[15em]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                {timeFilterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div class="rounded-lg w-full sm:w-[15em] border bg-card text-card-foreground shadow-sm p-1 px-2  flex items-center">
              <div class="flex items-center gap-2">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <Wallet className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex items-center  ">
                  <p class="text-sm w-full text-muted-foreground mr-2">
                    Total Capital:
                  </p>
                  <div class="flex items-center">
                    <IndianRupee className="h-4 w-3" />
                    <p class="text-lg font-bold">{totalInvestment}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="rounded-lg border bg-card text-card-foreground shadow-sm w-full sm:w-[15em] p-1 px-2 flex items-center">
              <div class="flex items-center gap-2">
                <div class="p-2 bg-green-100 rounded-lg">
                  <PiggyBank className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center ">
                  <p class="text-sm text-muted-foreground mr-2">
                    Available Credit:
                  </p>
                  <div class="flex items-center">
                    <IndianRupee className="h-4 w-3" />
                    <p class="text-lg font-bold">
                      {totalInvestment - totalWithdraws}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-col-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6">
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex items-center">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-orange-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">
                  Total Outstanding Loan
                </p>
                <div class="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  <p class="text-2xl font-bold">180,000.0</p>
                </div>
              </div>
            </div>
          </div>
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex items-center">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-pink-100 rounded-lg">
                <HandCoins className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Principal Payment</p>
                <div class="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  <p class="text-2xl font-bold">120,000.0</p>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex items-center">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-yellow-100 rounded-lg">
                <Receipt className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">
                  Total Processing Fee
                </p>
                <div class="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  <p class="text-2xl font-bold">20,000.0</p>
                </div>
              </div>
            </div>
          </div>
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex items-center">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-purple-100 rounded-lg">
                <Percent className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Interest Earnings</p>
                <div class="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  <p class="text-2xl font-bold">20,000.0</p>
                </div>
              </div>
            </div>
          </div>
          <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex items-center">
            <div class="flex items-center gap-4">
              <div class="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p class="text-sm text-muted-foreground">Penalty Earnings</p>
                <div class="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  <p class="text-2xl font-bold">20,000.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChartCard title="Received Amount" data={monthlyData} />
          <PieChartCard title="Distribution" data={distributionData} />
        </div>
      </div>
    </main>
  );
}
