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
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sidebarNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Loans", icon: Dock, href: "/dashboard/loans" },
  { title: "Investment", icon: IndianRupee, href: "/dashboard/investment" },
  { title: "Withdrawn", icon: CircleDollarSign, href: "/dashboard/withdrawn" },
  { title: "Payments", icon: IndianRupee, href: "/dashboard/payments" },
  { title: "Members", icon: Users, href: "/dashboard/members" },
];

export function Sidebar({ className }) {
  const { logoutUser } = useUser();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={cn("md:pb-12 md:min-h-screen bg-gray-100", className)}>
      <div className="space-y-4 py-4">
        {/* Header */}
        <div className="flex flex-col md:block py-2">
          <div className="flex items-center justify-between gap-2 px-4 md:mb-6">
            <div className="flex  gap-2">
              <PiggyBank className="h-6 w-6 text-indigo-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                ChitFund Pro
              </h2>
            </div>
            <div
              className=" block md:hidden bg-black p-1 rounded"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 font-bold text-white" />
              ) : (
                <Menu className="w-6 h-6 font-bold text-white" />
              )}
            </div>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:block space-y-1">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center w-full py-2 px-4 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === item.href
                    ? "bg-black text-white"
                    : "text-gray-700"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 mr-2",
                    pathname === item.href ? "text-white" : "text-gray-500"
                  )}
                />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        {/* Profile and Logout */}
        <div className="hidden md:block py-2">
          <div className="space-y-1">
            <Link
              href="/dashboard/profile"
              className={cn(
                "flex items-center w-full py-2 px-4 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                pathname === "/dashboard/profile"
                  ? "bg-black text-white"
                  : "text-gray-700"
              )}
            >
              <User
                className={cn(
                  "h-4 w-4 mr-2",
                  pathname === "/dashboard/profile"
                    ? "text-white"
                    : "text-gray-500"
                )}
              />
              Profile
            </Link>
            <div
              onClick={() => logoutUser()}
              className="flex items-center w-full py-2 px-4 text-sm font-medium rounded-md text-red-500 cursor-pointer hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div>
            <div className="absolute z-50 px-6 bg-white w-full">
              <div className=" space-y-1">
                {sidebarNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center w-full py-2 px-4 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                      pathname === item.href
                        ? "bg-black text-white"
                        : "text-gray-700"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4 mr-2",
                        pathname === item.href ? "text-white" : "text-gray-500"
                      )}
                    />
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="py-2">
                <div className="space-y-1">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center w-full py-2 px-4 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                      pathname === "/dashboard/profile"
                        ? "bg-black text-white"
                        : "text-gray-700"
                    )}
                  >
                    <User
                      className={cn(
                        "h-4 w-4 mr-2",
                        pathname === "/dashboard/profile"
                          ? "text-white"
                          : "text-gray-500"
                      )}
                    />
                    Profile
                  </Link>
                  <div
                    onClick={() => logoutUser()}
                    className="flex items-center w-full py-2 px-4 text-sm font-medium rounded-md text-red-500 cursor-pointer hover:bg-red-100 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </div>
                </div>
              </div>
            </div>
            <div
              className="fixed z-30 bg-[#0000006b] w-screen h-screen"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
