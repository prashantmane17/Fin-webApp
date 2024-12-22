"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, X } from "lucide-react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
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

export function AddLoanModal({ onClose, ownerid }) {
  const { setLoanData, userData, loanData } = useUser();
  const [newloanId, setNewloanId] = useState(2001);
  const [newCustId, setNewCustId] = useState(1001);
  const [showDropdown, setShowDropdown] = useState(false);


  let loanName = loanData.map((item) => {
    return {
      name: item.name,
      custId: item.customerId
    };
  });

  let loanCustId = loanData.map((item) => item.customerId);
  let loanIds = loanData.map((item) => item.loanId);

  let nextCustomerId = loanCustId.length > 0
    ? Math.max(...loanCustId.map(id => parseInt(id.replace('Cust-', '')))) + 1
    : 1001;

  let nextLoanId = loanIds.length > 0
    ? Math.max(...loanIds.map(id => parseInt(id.replace('LN-', '')))) + 1
    : 1001;

  const userIdString = String(userData.id);
  let intialData = {
    name: "", customerId: `CUST-${nextCustomerId}`, loanId: `LN-${nextLoanId}`, email: "", phone: "", loanAmount: "", processingFee: "",
    interest: "", totalInstallment: "", installmentAmount: "0", advancePayment: "0", approvalDate: new Date(),
    repaymentStartDate: new Date(), paymentMethod: "", repaymentMethod: "monthly", owner: userIdString,
  };
  const [formData, setFormData] = useState(intialData);
  const calculateInstallmentAmount = () => {
    const amount = parseFloat(formData.loanAmount) || 0;
    const installments = parseInt(formData.totalInstallment) || 1;
    const advance = parseFloat(formData.advancePayment) || 0;


    let yearlyRate = 0;



    const principalAfterAdvance = amount - advance;
    const installmentAmount = principalAfterAdvance / installments;

    return {
      installmentAmount: installmentAmount.toFixed(2),
      yearlyRate: yearlyRate.toFixed(2),
    };
  };

  const generateEmiHistory = (startDate, repaymentMethod, totalInstallments, advancePayment) => {
    const emiHistory = [];
    const installmentAmount = parseFloat(formData.installmentAmount) || 0;

    // Add the advance payment as the first EMI entry
    if (advancePayment > 0) {
      emiHistory.push({
        date: new Date(startDate).toISOString().split("T")[0], // Use the repayment start date for advance payment
        amount: advancePayment.toFixed(2),
        transactionId: "TXN00000", // Indicate advance payment with a unique ID
      });
    }

    let currentDate = new Date(startDate);

    // Start EMI schedule from the next date based on repayment frequency
    for (let i = 1; i <= totalInstallments; i++) {
      switch (repaymentMethod) {
        case "daily":
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        case "weekly":
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case "monthly":
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
      }
      console.log(
        installmentAmount.toFixed(2),
        "amaoiut----------",
        installmentAmount
      );
      emiHistory.push({
        date: currentDate.toISOString().split("T")[0],
        amount: installmentAmount.toFixed(2),
        transactionId: `TXN${i.toString().padStart(5, "0")}`,
      });
    }

    return emiHistory;
  };
  const handleSelectName = (name, id) => {
    handleInputChange("name", name);
    handleInputChange("customerId", id);
    setShowDropdown(false);
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      const { installmentAmount } = calculateInstallmentAmount();

      const emiHistory = newData.repaymentStartDate && newData.repaymentMethod && newData.totalInstallment
        ? generateEmiHistory(
          new Date(newData.repaymentStartDate), newData.repaymentMethod, parseInt(newData.totalInstallment),
          parseFloat(newData.advancePayment) || 0) : [];

      return {
        ...newData,
        installmentAmount,
        emiHistory,
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
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-30"
    >
      <div className="max-w-2xl h-[96%] bg-white  rounded-lg pb-2">
        <div className=" p-4 rounded-t-lg flex items-center justify-between" >
          <div className="text-xl font-bold text-blue-800">
            Add Loan Details
          </div>
          <div className=" bg-black rounded cursor-pointer" onClick={onClose}>
            <X className="text-white font-bold" />
          </div>
        </div>
        <div className="scroll_Bar p-4 rounded-lg overflow-y-auto h-[89%] ">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 relative">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Select or Enter Name"
                value={formData.name}
                onClick={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                onChange={(e) => {
                  handleInputChange("name", e.target.value);
                  setShowDropdown(false)
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />

              {showDropdown && (
                <div
                  className="absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-10"
                  onMouseDown={(e) => e.preventDefault()} // Prevents input blur when clicking
                >
                  {loanName.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleSelectName(item.name, item.custId);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}


            </div>
            <div className="space-y-2">
              <Label htmlFor="customerId">Customer ID *</Label>
              <Input
                id="customerId"
                value={formData.customerId}
                placeholder="CUST-1001"
                readOnly

              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanId">Loan ID *</Label>
              <Input
                id="loanId"
                placeholder="LN-85954"
                value={formData.loanId}
                readOnly
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
                onChange={(e) => {
                  handleInputChange("totalInstallment", e.target.value);
                  calculateInstallmentAmount();
                }
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
                onChange={(e) => {
                  handleInputChange("advancePayment", e.target.value);
                  calculateInstallmentAmount();
                }
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
      </div>
    </div>
  );
}
