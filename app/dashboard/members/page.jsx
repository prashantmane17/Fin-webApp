"use client";

import { useState, useEffect } from "react";
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
import { Search, Filter, Users, IndianRupee, Calendar, ChevronLeft, ChevronRight, LayoutGrid, List, Download, Plus } from 'lucide-react';

// Sample data for demonstration (unchanged)
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
  const [entriesPerPage, setEntriesPerPage] = useState("25");

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredMembers.length / parseInt(entriesPerPage));

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * parseInt(entriesPerPage);
    const endIndex = startIndex + parseInt(entriesPerPage);
    return filteredMembers.slice(startIndex, endIndex);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "card" : "list");
    setCurrentPage(1);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
      <div
        className="w-[100%]  flex-grow flex flex-col"
        style={{ maxHeight: "calc(100vh - 48px)" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded">
              <Users className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-semibold">Members</h1>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-3">
          <div className="p-4 flex flex-col md:flex-row gap-2 justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search members..."
                  className="pl-9 md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
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
                Total: {filteredMembers.length}
              </span>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button
                onClick={toggleViewMode}
                variant="outline"
                className="gap-2"
              >
                {viewMode === "list" ? (
                  <LayoutGrid className="w-4 h-4" />
                ) : (
                  <List className="w-4 h-4" />
                )}
                {viewMode === "list" ? "Card View" : "List View"}
              </Button>
            </div>
          </div>
        </div>

        {/* Table/Card View */}
        <div className="bg-white rounded-lg shadow flex-grow overflow-auto">
          {viewMode === "list" ? (
            <Table className="relative">
              <TableHeader className="sticky top-0 z-10">
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
                {getCurrentPageItems().map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        {formatDate(member.joinDate)}
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
              {getCurrentPageItems().map((member) => (
                <Card key={member.id} className="flex flex-col justify-between">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        {formatDate(member.joinDate)}
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
          {filteredMembers.length === 0 && (
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
              filteredMembers.length
            )}{" "}
            of {filteredMembers.length} entries
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

