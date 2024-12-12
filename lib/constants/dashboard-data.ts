export const monthlyData = [
  { name: "Jan", amount: 45000 },
  { name: "Feb", amount: 52000 },
  { name: "Mar", amount: 48000 },
  { name: "Apr", amount: 61000 },
  { name: "May", amount: 55000 },
  { name: "Jun", amount: 67000 },
  { name: "Jul", amount: 72000 },
  { name: "Aug", amount: 69000 },
  { name: "Sep", amount: 78000 },
  { name: "Oct", amount: 82000 },
  { name: "Nov", amount: 85000 },
  { name: "Dec", amount: 91000 },
];

export const distributionData = [
  { name: "Loans", value: 45 },
  { name: "Investments", value: 30 },
  { name: "Savings", value: 25 },
];

export const CHART_COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

export type TimeFilter = "this_year" | "this_month" | "previous_month";

export const timeFilterOptions = [
  { label: "This Year", value: "this_year" },
  { label: "This Month", value: "this_month" },
  { label: "Previous Month", value: "previous_month" },
];