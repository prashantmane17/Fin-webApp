"use client";

import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import {
  IndianRupee,
  LayoutDashboard,
  Users,
  PiggyBank,
  LogOut,
  CircleDollarSign,
  Dock,
  User,
} from "lucide-react";
import Link from "next/link";

const sidebarNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Loans", icon: Dock, href: "/dashboard/loans" },
  { title: "Investment", icon: IndianRupee, href: "/dashboard/investment" },
  { title: "withdrawn", icon: CircleDollarSign, href: "/dashboard/withdrawn" },
  { title: "Payments", icon: IndianRupee, href: "/dashboard/payments" },
  { title: "Members", icon: Users, href: "/dashboard/members" },
];

export function Sidebar({ className }) {
  const { logoutUser } = useUser();
  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className=" py-2">
          <div className="flex items-center gap-2 px-4 mb-6">
            <PiggyBank className="h-6 w-6" />
            <h2 className="text-lg font-semibold">ChitFund Pro</h2>
          </div>
          <div className="space-y-1">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center w-full py-2 px-4 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className=" py-2">
          <div className="space-y-1">
            <Link
              href="/dashboard/profile"
              className="flex items-center w-full py-2 px-4 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>

            <div
              onClick={() => {
                logoutUser();
              }}
              className="flex items-center w-full py-2 px-4 text-sm font-medium rounded-md text-red-500 cursor-pointer hover:bg-red-100 hover:text-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
