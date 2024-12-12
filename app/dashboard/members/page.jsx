"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
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
  Search,
  Filter,
  Users,
  IndianRupee,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react";

// Sample data for demonstration
const members = [
  {
    id: 1,
    name: "John Doe",
    status: "active",
    joinDate: "2023-01-15",
    totalLoan: 500000,
    paidTotal: 300000,
    yearsStayed: 2,
    isNew: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    status: "inactive",
    joinDate: "2020-05-20",
    totalLoan: 750000,
    paidTotal: 750000,
    yearsStayed: 5,
    isNew: false,
  },
  {
    id: 3,
    name: "Alice Johnson",
    status: "pending",
    joinDate: "2024-03-01",
    totalLoan: 0,
    paidTotal: 0,
    yearsStayed: 0,
    isNew: true,
  },
  // Add more sample data as needed
];

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("list");

  const itemsPerPage = viewMode === "list" ? 10 : 8;

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "card" : "list");
    setCurrentPage(1); // Reset to first page when switching views
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
          <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Button
              onClick={toggleViewMode}
              variant="outline"
              className="w-full md:w-auto"
            >
              {viewMode === "list" ? (
                <LayoutGrid className="mr-2 h-4 w-4" />
              ) : (
                <List className="mr-2 h-4 w-4" />
              )}
              {viewMode === "list" ? "Card View" : "List View"}
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <Filter className="text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-500 w-full md:w-auto">
              Total Members: {filteredMembers.length}
            </div>
          </div>
        </div>
      </div>

      {viewMode === "list" ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Joining Date</TableHead>
              <TableHead>Total Loan Amount</TableHead>
              <TableHead>Paid Total</TableHead>
              <TableHead>Membership Duration</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                    {member.joinDate}
                    {member.isNew && (
                      <Badge className="ml-2 bg-blue-100 text-blue-800">
                        New
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <IndianRupee className="mr-1 h-4 w-4 text-gray-400" />
                    {member.totalLoan.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <IndianRupee className="mr-1 h-4 w-4 text-gray-400" />
                    {member.paidTotal.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-gray-400" />
                    {member.yearsStayed}{" "}
                    {member.yearsStayed === 1 ? "year" : "years"}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn("capitalize", {
                      "bg-green-100 text-green-800": member.status === "active",
                      "bg-red-100 text-red-800": member.status === "inactive",
                      "bg-yellow-100 text-yellow-800":
                        member.status === "pending",
                    })}
                  >
                    {member.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
          {paginatedMembers.map((member) => (
            <Card key={member.id} className="flex flex-col justify-between">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                    {member.joinDate}
                    {member.isNew && (
                      <Badge className="ml-2 bg-blue-100 text-blue-800">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="mr-2 h-4 w-4 text-gray-400" />
                    Total Loan: {member.totalLoan.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="mr-2 h-4 w-4 text-gray-400" />
                    Paid: {member.paidTotal.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-gray-400" />
                    {member.yearsStayed}{" "}
                    {member.yearsStayed === 1 ? "year" : "years"}
                  </div>
                  <Badge
                    className={cn("capitalize", {
                      "bg-green-100 text-green-800": member.status === "active",
                      "bg-red-100 text-red-800": member.status === "inactive",
                      "bg-yellow-100 text-yellow-800":
                        member.status === "pending",
                    })}
                  >
                    {member.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500 order-2 md:order-1">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredMembers.length)} of{" "}
            {filteredMembers.length} members
          </div>
          <div className="flex items-center space-x-2 order-1 md:order-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
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
