import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const recentActivities = [
  {
    id: 1,
    activity: "Payment Received",
    member: "John Doe",
    amount: "₹10,000",
    date: "2024-03-20",
  },
  {
    id: 2,
    activity: "New Member Joined",
    member: "Jane Smith",
    amount: "-",
    date: "2024-03-19",
  },
  {
    id: 3,
    activity: "Auction Completed",
    member: "Mike Johnson",
    amount: "₹50,000",
    date: "2024-03-18",
  },
];

export function RecentActivities() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium">{activity.activity}</p>
                  <p className="text-sm text-muted-foreground">{activity.member}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{activity.amount}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}