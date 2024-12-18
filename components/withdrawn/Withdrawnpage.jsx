"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  Download,
  Filter,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  User,
} from "lucide-react";
import { AddLoanModal } from "@/components/model/loan_model";

// Sample data
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
    remarks: 'No Remarks',
    installments: 10,
    nextPayment: {
      amount: 1891.19,
      date: "10-Jan-2025",
      status: "Due",
    },
    status: "Active",
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter loans based on search term and status
  const filteredLoans = sampleLoans.filter((loan) => {
    const matchesSearch =
      loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.customerId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : loan.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    setTotalPages(Math.ceil(filteredLoans.length / parseInt(entriesPerPage)));
  }, [filteredLoans, entriesPerPage]);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
    const endIndex = startIndex + parseInt(entriesPerPage);
    return filteredLoans.slice(startIndex, endIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
      <div
        className="w-[100%] mx-auto flex-grow flex flex-col"
        style={{ maxHeight: "calc(100vh - 48px)" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold">Withdrawn</h1>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
          <AddLoanModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-3">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-9 w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="25" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500">
                Total: {filteredLoans.length}
              </span>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow flex-grow overflow-auto">
        <Table className="relative">
  <TableHeader className="sticky top-0 z-10">
    <TableRow>
      <TableHead className="w-[30px]">
        <input type="checkbox" className="rounded" />
      </TableHead>
      <TableHead>DATE</TableHead>
      <TableHead>AMOUNT</TableHead>
      <TableHead>REMARKS</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {getCurrentPageItems().map((loan) => (
      <TableRow key={loan.id}>
        <TableCell>
          <input type="checkbox" className="rounded" />
        </TableCell>
        <TableCell>{loan.nextPayment.date}</TableCell>
        <TableCell>{loan.nextPayment.amount}</TableCell>
        <TableCell>{loan.remarks}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
          {filteredLoans.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No records found
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-2 flex justify-between items-center">
          <div>
            Showing {(currentPage - 1) * parseInt(entriesPerPage) + 1} to{" "}
            {Math.min(
              currentPage * parseInt(entriesPerPage),
              filteredLoans.length
            )}{" "}
            of {filteredLoans.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
