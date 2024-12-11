"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Search,
  Filter,
  UserPlus,
  Users,
  IndianRupee,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
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
  const [isNewMemberDialogOpen, setIsNewMemberDialogOpen] = useState(false);
  const itemsPerPage = 10;

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

  const handleAddNewMember = (event) => {
    event.preventDefault();
    // Add logic to handle new member submission
    setIsNewMemberDialogOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        {/* <Dialog
            open={isNewMemberDialogOpen}
            onOpenChange={setIsNewMemberDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddNewMember} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Enter full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input
                    id="mobileNumber"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter address" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initialLoanAmount">Initial Loan Amount</Label>
                  <Input
                    id="initialLoanAmount"
                    type="number"
                    placeholder="Enter initial loan amount"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="membershipType">Membership Type</Label>
                  <Select>
                    <SelectTrigger id="membershipType">
                      <SelectValue placeholder="Select membership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-4 flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsNewMemberDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add Member
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog> */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
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
            <div className="text-sm text-gray-500">
              Total Members: {filteredMembers.length}
            </div>
          </div>
        </div>
      </div>

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

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredMembers.length)} of{" "}
            {filteredMembers.length} members
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
