"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IndianRupee, TrendingUp, Calendar } from "lucide-react";

export function InvestmentSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹2,50,000</div>
          <p className="text-xs text-muted-foreground mt-1">Across 3 schemes</p>
          <Progress value={75} className="mt-3" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Returns Earned</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹32,500</div>
          <p className="text-xs text-muted-foreground mt-1">+12.5% return rate</p>
          <Progress value={65} className="mt-3" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Duration</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1.5 Years</div>
          <p className="text-xs text-muted-foreground mt-1">Member since Aug 2022</p>
          <Progress value={45} className="mt-3" />
        </CardContent>
      </Card>
    </div>
  );
}