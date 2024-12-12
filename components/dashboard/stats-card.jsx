// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export function StatsCard({ title, value, icon: Icon, description, className }) {
//   return (
//     <Card className={className}>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         <div className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10">
//           <Icon className="h-4 w-4 text-primary" />
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">{value}</div>
//         <p className="text-xs text-muted-foreground mt-1">{description}</p>
//       </CardContent>
//     </Card>
//   );
// }

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
