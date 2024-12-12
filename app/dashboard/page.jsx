"use client";

import { useState } from "react";
import {
  Wallet,
  PiggyBank,
  Percent,
  DollarSign,
  AlertCircle,
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
  typeTimeFilter,
} from "@/lib/constants/dashboard-data";
import { StatCard } from "@/components/dashboard/stats-card";
import { LineChartCard } from "@/components/dashboard/analytics/line-chart";
import { PieChartCard } from "@/components/dashboard/analytics/pie-chart";

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = useState("this_year");

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Select
            value={timeFilter}
            onValueChange={(value) => setTimeFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
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
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Capital"
            value="500,000.00"
            icon={Wallet}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Available Credit"
            value="250,000.00"
            icon={PiggyBank}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Interest Earnings"
            value="75,000.00"
            icon={Percent}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>

        {/* Middle Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Outstanding Loan"
            value="180,000.00"
            icon={AlertCircle}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
          <StatCard
            title="Principal Payment"
            value="120,000.00"
            icon={DollarSign}
            iconBgColor="bg-pink-100"
            iconColor="text-pink-600"
          />
          <StatCard
            title="Expected Interest"
            value="25,000.00"
            icon={Percent}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChartCard title="Received Amount" data={monthlyData} />
          <PieChartCard title="Distribution" data={distributionData} />
        </div>
      </div>
    </main>
  );
}
