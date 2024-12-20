
"use client";

import { Card } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";
import { LucideIcon } from "lucide-react";

export function StatCard(props) {
  const { title, value, icon: Icon, iconBgColor, iconColor } = props;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 ${iconBgColor} rounded-lg`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4" />
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
