"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

import { addLoanDetails } from "@/axios/loanApi";
import { useUser } from "@/context/UserContext";

export function AddLoanModal({ open, onClose, setloan, ownerid }) {
  const { setLoanData, userData } = useUser();
  const userIdString = String(userData.id);
  let intialData = {
    name: "",
    customerId: "",
    loanId: "",
    email: "",
    phone: "",
    loanAmount: "",
    processingFee: "",
    interest: "",
    totalInstallment: "",
    installmentAmount: "0",
    advancePayment: "0",
    approvalDate: new Date(),
    repaymentStartDate: new Date(),
    paymentMethod: "",
    repaymentMethod: "monthly",
    owner: userIdString,
  };
  const [formData, setFormData] = useState(intialData);
  const calculateInstallmentAmount = () => {
    const amount = parseFloat(formData.loanAmount) || 0;
    const fee = parseFloat(formData.processingFee) || 0;
    const installments = parseInt(formData.totalInstallment) || 1;
    const advance = parseFloat(formData.advancePayment) || 0;
    const interestRate = parseFloat(formData.interest) || 0;

    let yearlyRate = 0;
    switch (formData.repaymentMethod) {
      case "daily":
        yearlyRate = interestRate * 365;
        break;
      case "weekly":
        yearlyRate = interestRate * 52;
        break;
      case "monthly":
        yearlyRate = interestRate * 12;
        break;
    }

    const totalAmount = amount + fee;
    const principalAfterAdvance = totalAmount - advance;
    const interestAmount = principalAfterAdvance * (interestRate / 100);
    const totalWithInterest = principalAfterAdvance + interestAmount;
    const installmentAmount = totalWithInterest / installments;

    return {
      installmentAmount: installmentAmount.toFixed(2),
      yearlyRate: yearlyRate.toFixed(2),
    };
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      const { installmentAmount } = calculateInstallmentAmount();
      return {
        ...newData,
        installmentAmount,
      };
    });
  };

  const { yearlyRate } = calculateInstallmentAmount();

  const handleSubmit = async () => {
    setFormData((prevData) => ({
      ...prevData,
      owner: ownerid,
    }));
    try {
      const response = await addLoanDetails(formData);

      if (response.success) {
        setLoanData((prevLoans) =>
          Array.isArray(prevLoans)
            ? [...prevLoans, response.data]
            : [response.data]
        );
        // console.log(response.data);
        setFormData(intialData);
        toast.success("loan added SuccessFully!!..", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        onClose();
      } else {
        toast.error("Failed to submit loan data", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error submitting loan data:", error);
      toast.error("An unexpected error occurred", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="bg-blue-100 p-4 rounded-t-lg">
          <DialogTitle className="text-xl font-bold text-blue-800">
            Add Loan Details
          </DialogTitle>
        </DialogHeader>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Select Or Enter Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerId">Customer ID *</Label>
              <Input
                id="customerId"
                value={formData.customerId}
                placeholder="CUST-86384"
                onChange={(e) =>
                  handleInputChange("customerId", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanId">Loan ID *</Label>
              <Input
                id="loanId"
                placeholder="LN-85954"
                value={formData.loanId}
                onChange={(e) => handleInputChange("loanId", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter the Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount *</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="Enter Loan Amount"
                value={formData.loanAmount}
                onChange={(e) =>
                  handleInputChange("loanAmount", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="processingFee">
                Processing Fee (In Amount) *
              </Label>
              <Input
                id="processingFee"
                type="number"
                placeholder="Enter Processing Fee"
                value={formData.processingFee}
                onChange={(e) =>
                  handleInputChange("processingFee", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interest">Interest (%) *</Label>
              <Input
                id="interest"
                type="number"
                placeholder="Enter Interest Rate"
                value={formData.interest}
                onChange={(e) => handleInputChange("interest", e.target.value)}
              />
              <div className="text-sm text-gray-500 text-[13px] mt-2">
                Yearly Interest: {formData.interest} x{" "}
                {formData.repaymentMethod === "monthly"
                  ? "12"
                  : formData.repaymentMethod === "weekly"
                  ? "52"
                  : "365"}{" "}
                = {yearlyRate}%
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="repaymentMethod">Repayment Method *</Label>
              <Select
                value={formData.repaymentMethod}
                onValueChange={(value) =>
                  handleInputChange("repaymentMethod", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select repayment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalInstallment">Total Installment *</Label>
              <Input
                id="totalInstallment"
                type="number"
                placeholder="Enter Total Installment"
                value={formData.totalInstallment}
                onChange={(e) =>
                  handleInputChange("totalInstallment", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="advancePayment">Advance Payment</Label>
              <Input
                id="advancePayment"
                type="number"
                placeholder="Enter Advance Payment"
                value={formData.advancePayment}
                onChange={(e) =>
                  handleInputChange("advancePayment", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="installmentAmount">Installment Amount</Label>
              <Input
                id="installmentAmount"
                type="number"
                value={formData.installmentAmount}
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="approvalDate">Loan Approval Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {formData.approvalDate ? (
                      format(formData.approvalDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={formData.approvalDate}
                    onSelect={(date) =>
                      handleInputChange("approvalDate", date || new Date())
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="repaymentStartDate">Repayment Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {formData.repaymentStartDate ? (
                      format(formData.repaymentStartDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={formData.repaymentStartDate}
                    onSelect={(date) =>
                      handleInputChange(
                        "repaymentStartDate",
                        date || new Date()
                      )
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  handleInputChange("paymentMethod", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="upi">UPI Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
