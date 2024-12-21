import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  PhoneCall,
  Calendar,
  DollarSign,
  CreditCard,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CardView = ({ loans, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentFilter, setPaymentFilter] = useState("all");
  const loansPerPage = 6;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePaymentFilter = (value) => {
    setPaymentFilter(value);
    setCurrentPage(1);
  };

  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      const nameMatch = loan.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const statusMatch =
        paymentFilter === "all" ||
        (paymentFilter === "paid" && loan.paymentStatus === "Paid") ||
        (paymentFilter === "due" && loan.paymentStatus !== "Paid");
      return nameMatch && statusMatch;
    });
  }, [loans, searchTerm, paymentFilter]);

  const totalLoans = filteredLoans.length;
  const totalPages = Math.ceil(totalLoans / loansPerPage);

  const startIndex = (currentPage - 1) * loansPerPage;
  const displayedLoans = filteredLoans.slice(
    startIndex,
    startIndex + loansPerPage
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4 w-[90vw]">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by name"
            className="w-full sm:w-64"
            value={searchTerm}
            onChange={handleSearch}
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select
            value={paymentFilter}
            onValueChange={handlePaymentFilter}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="due">Due</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-gray-700">
          Total Loans:{" "}
          <span className="font-semibold">
            {isLoading ? <Skeleton width={40} /> : totalLoans}
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 bg-white p-2 rounded-lg shadow">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(Math.max(1, currentPage - 1))}
          disabled={isLoading || currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={
              index + 1 === currentPage && !isLoading ? "default" : "outline"
            }
            size="sm"
            onClick={() => goToPage(index + 1)}
            disabled={isLoading}
          >
            {isLoading ? <Skeleton width={16} height={16} /> : index + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
          disabled={isLoading || currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: loansPerPage }).map((_, index) => (
              <Card
                className="mb-2 bg-gradient-to-br from-gray-50 to-gray-100"
                key={index}
              >
                <CardContent className="p-6">
                  <Skeleton height={24} width={150} className="mb-4" />
                  <Skeleton count={4} className="mb-2" />
                  <div className="flex justify-between mt-4">
                    <Skeleton width={80} height={32} />
                    <Skeleton width={60} height={32} />
                  </div>
                </CardContent>
              </Card>
            ))
          : displayedLoans.map((loan) => (
              <Card
                key={loan.loanId}
                className="overflow-hidden transition-shadow duration-300 hover:shadow-lg"
              >
                <CardContent className="p-0">
                  <div className="flex justify-between bg-gradient-to-r from-gray-700 to-gray-800 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{loan.name}</h3>
                    <div className="text-sm flex items-center opacity-80">
                      <PhoneCall className="w-4 h-4 mr-1" />
                      {loan.phone}
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center text-sm">
                        <CreditCard className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="font-medium">Customer ID:</span>
                      </div>
                      <div className="text-sm text-right">
                        {loan.customerId}
                      </div>
                      <div className="flex items-center text-sm">
                        <CreditCard className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="font-medium">Loan ID:</span>
                      </div>
                      <div className="text-sm text-right">{loan.loanId}</div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="font-medium">Amount:</span>
                      </div>
                      <div className="text-sm text-right">
                        ₹ {loan.loanAmount.toLocaleString()}
                      </div>
                      <div className="flex items-center text-sm">
                        <ArrowRight className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="font-medium">Installments:</span>
                      </div>
                      <div className="text-sm text-right">
                        {loan.totalInstallment}
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="font-medium">Next Payment:</span>
                      </div>
                      <div className="text-sm text-right">
                        ₹ {loan.installmentAmount}
                        <br />
                        <span className="text-xs text-gray-500">
                          {formatDate(loan.repaymentStartDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <Badge
                        variant={
                          loan.paymentStatus === "Paid"
                            ? "success"
                            : "destructive"
                        }
                        className="px-2 py-1 text-xs font-semibold"
                      >
                        {loan.paymentStatus}
                      </Badge>
                      <Badge
                        variant={
                          loan.status === "Completed" ? "success" : "warning"
                        }
                        className="px-2 py-1 text-xs font-semibold"
                      >
                        {loan.status}
                      </Badge>
                      <Button variant="outline" size="sm" className="ml-2">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default CardView;
