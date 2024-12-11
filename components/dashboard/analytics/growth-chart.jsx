"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", collections: 320000 },
  { month: "Feb", collections: 380000 },
  { month: "Mar", collections: 450000 },
  { month: "Apr", collections: 420000 },
  { month: "May", collections: 500000 },
  { month: "Jun", collections: 480000 },
];

export function GrowthChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Collection Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `₹${value/1000}K`}
              />
              <Tooltip 
                formatter={(value) => [`₹${value.toLocaleString()}`, "Collections"]}
              />
              <Line 
                type="monotone" 
                dataKey="collections" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}