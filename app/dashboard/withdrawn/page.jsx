import React from "react";
import Withdrawnpage from "@/components/withdrawn/Withdrawnpage";
const sampleLoans = [
  {
    id: "LN-33698",
    customerId: "CUST-49593",
    customerName: "Navin J",
    phoneNumber: "8431187297",
    amount: 30000.0,
    installments: 0,
    remarks: "No",
    nextPayment: {
      amount: 6550.64,
      date: "30-Dec-2024",
      status: "Paid",
    },
    status: "Completed",
  },
  {
    id: "LN-25905",
    customerId: "VED-0401",
    customerName: "Harish F",
    phoneNumber: "9363145394",
    amount: 20000.0,
    remarks: "--",
    installments: 6,
    nextPayment: {
      amount: 1891.19,
      date: "08-Jan-2025",
      status: "Due",
    },
    status: "Active",
  },
  {
    id: "23443",
    customerId: "VED-0401",
    customerName: "Harish F",
    phoneNumber: "9363145394",
    amount: 20000.0,
    remarks: "No Remarks",
    installments: 10,
    nextPayment: {
      amount: 1891.19,
      date: "10-Jan-2025",
      status: "Due",
    },
    status: "Active",
  },
];
export default function page() {
  return (
    <div>
      <Withdrawnpage loanData={sampleLoans} />
    </div>
  );
}
