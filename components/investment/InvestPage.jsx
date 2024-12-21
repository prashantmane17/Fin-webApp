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
  Calendar,
  IndianRupee,
} from "lucide-react";
import { useInvestment } from "../../context/InvestmentContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { invest_Withdraw } from "@/axios/investWithdraw";

export default function Invest() {
  const intialData = { amount: "", remark: "", date: "" };
  const [formData, setFormData] = useState(intialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setInvestmentData, investmentData, loading } = useInvestment();
  let investments = [];
  if (!loading) {
    investments = investmentData.investments;
  }

  const filteredLoans = investments.filter((loan) => {
    const matchesSearch = loan.remark
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

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
  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formData.amount || !formData.date) {
      setIsSubmitting(false);
      return;
    }
    const email = investmentData.email;
    const requestData = {
      email,
      investments: {
        ...formData, // Spread form data into the investment object
      },
    };
    try {
      const response = await invest_Withdraw(requestData);
      if (response.success) {
        setIsSubmitting(false);
        setIsModalOpen(false);
        setInvestmentData((prevData) => {
          const updatedWithdrawals = [...prevData.investments, formData];
          return {
            ...prevData,
            investments: updatedWithdrawals,
          };
        });
      }
    } catch (error) {}
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
            <h1 className="text-2xl font-semibold">Investment</h1>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Investment
          </Button>
          {isModalOpen && (
            <div className="modal fixed top-0 z-50 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h2 className="text-xl flex items-center gap-3 font-semibold text-gray-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                      ></path>
                    </svg>
                    <span>Add Investment</span>
                  </h2>
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-gray-800 text-2xl transition-colors bg-white hover:bg-white"
                  >
                    ×
                  </Button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                    <div className="form-group">
                      <label
                        htmlFor="newInvestedAmt"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Amount <span className="text-red-600">*</span>
                      </label>
                      <Input
                        id="newInvestedAmt"
                        name="amount"
                        className="mt-1 border border-gray-300 rounded-lg w-full py-1 px-3 focus:outline-none  focus:border-indigo-500"
                        placeholder="Enter the amount"
                        required=""
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="comments"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Remarks
                      </label>
                      <textarea
                        id="comments"
                        name="remark"
                        className="block w-full px-4 py-4 border rounded-md shadow-sm capitalize focus:outline-none  focus:border-indigo-500"
                        placeholder="Optional"
                        value={formData.remark}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 "
                      >
                        Date <span className="text-red-600">*</span>
                      </label>
                      <Input
                        id="invest-date"
                        type="date"
                        name="date"
                        className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-3">
          <div className="p-4 flex flex-col md:flex-row  gap-2 justify-between items-center">
            <div className="flex  items-center gap-4">
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
                  className="pl-9 md:w-[300px]"
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
                {/* <TableHead className="w-[30px]">
                  <Input type="checkbox" />
                </TableHead> */}
                <TableHead>DATE</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>REMARKS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading &&
                [...Array(2)].map((_, index) => (
                  <TableRow key={index}>
                    {/* <TableCell>
                      <Input type="checkbox" />
                    </TableCell> */}
                    <TableCell>
                      <Skeleton width={136} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={120} />
                    </TableCell>
                  </TableRow>
                ))}
              {getCurrentPageItems().map((loan, index) => (
                <TableRow key={index}>
                  {/* <TableCell>
                    <Input type="checkbox" />
                  </TableCell> */}
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 hidden text-gray-500" />
                      {formatDate(loan.date)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <IndianRupee className="w-4 h-4 mr-1 text-gray-500" />
                      {loan.amount}
                    </div>
                  </TableCell>
                  <TableCell>{loan.remark}</TableCell>
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
