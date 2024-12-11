"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IndianRupee, LayoutDashboard, Users, PiggyBank, Calendar, Settings, HelpCircle, LogOut } from "lucide-react";

const sidebarNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Members", icon: Users, href: "/members" },
  { title: "Chit Schemes", icon: PiggyBank, href: "/schemes" },
  { title: "Payments", icon: IndianRupee, href: "/payments" },
  { title: "Schedule", icon: Calendar, href: "/schedule" },
];

export function Sidebar({ className }) {
  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-4 mb-6">
            <PiggyBank className="h-6 w-6" />
            <h2 className="text-lg font-semibold">ChitFund Pro</h2>
          </div>
          <div className="space-y-1">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="w-full justify-start gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Support
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-red-500">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}