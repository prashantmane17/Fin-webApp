"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 280 },
  { name: 'May', value: 590 },
  { name: 'Jun', value: 430 }
];

export function InvestmentSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Total Investment
          </CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹2,50,000</div>
          <p className="text-xs text-muted-foreground mt-1">Across 3 schemes</p>
          <div className="h-[60px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Returns Earned</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹32,500</div>
          <p className="text-xs text-muted-foreground mt-1">
            +12.5% return rate
          </p>
          <div className="h-[60px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Duration</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1.5 Years</div>
          <p className="text-xs text-muted-foreground mt-1">
            Member since Aug 2022
          </p>
          <div className="mt-4 flex items-end space-x-1">
            {[1, 2, 3, 4, 5, 6].map((month) => (
              <div
                key={month}
                className="bg-primary/10 rounded-sm w-1/6"
                style={{ height: `${month * 10}px` }}
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

