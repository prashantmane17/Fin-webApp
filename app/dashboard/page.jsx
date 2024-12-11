"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { GrowthChart } from "@/components/dashboard/analytics/growth-chart";
import { MemberDistribution } from "@/components/dashboard/analytics/member-distribution";
import { IndianRupee, Users, PiggyBank, TrendingUp, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-muted/5">
      <Sidebar className="w-64 border-r bg-background" />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, Admin</p>
          </div>
          <Button size="icon" variant="outline" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatsCard
            title="Total Collections"
            value="₹4,50,000"
            icon={IndianRupee}
            description="+20.1% from last month"
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900"
          />
          <StatsCard
            title="Active Members"
            value="48"
            icon={Users}
            description="2 new members this week"
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900"
          />
          <StatsCard
            title="Active Schemes"
            value="6"
            icon={PiggyBank}
            description="2 schemes ending soon"
            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900"
          />
          <StatsCard
            title="Average Dividend"
            value="₹2,500"
            icon={TrendingUp}
            description="Per member per month"
            className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <GrowthChart />
          <MemberDistribution />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <RecentActivities />
        </div>
      </main>
    </div>
  );
}