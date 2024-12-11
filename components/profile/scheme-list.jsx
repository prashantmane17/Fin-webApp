"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PiggyBank } from "lucide-react";

const schemes = [
  {
    id: 1,
    name: "Gold Savings Scheme",
    amount: "₹1,00,000",
    duration: "24 months",
    status: "active",
    nextPayment: "2024-04-15",
  },
  {
    id: 2,
    name: "Premium Plan",
    amount: "₹50,000",
    duration: "12 months",
    status: "active",
    nextPayment: "2024-04-10",
  },
  {
    id: 3,
    name: "Silver Savings",
    amount: "₹1,00,000",
    duration: "36 months",
    status: "active",
    nextPayment: "2024-04-20",
  },
];

export function SchemeList() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5" />
            Active Schemes
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {schemes.map((scheme) => (
              <div
                key={scheme.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card"
              >
                <div className="space-y-1">
                  <p className="font-medium">{scheme.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{scheme.duration}</span>
                    <span>•</span>
                    <span>{scheme.amount}</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="mb-1">
                    Next Payment: {scheme.nextPayment}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}