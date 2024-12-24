"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { GeneralInfo } from "@/components/loan/GeneralInfo";
import { PaymentSchedule } from "@/components/loan/PaymentSchedule";
import { PaymentHistory } from "@/components/loan/PaymentHistory";
import { Documents } from "@/components/loan/Documents";
import Link from "next/link";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useState, useEffect } from "react";

const Page = () => {
  const { id } = useParams();
  const { loanData, loanisLoading } = useUser();
  const [initialLoanData, setInitialLoanData] = useState(null); // State for the initial loan data

  // Set initial loan data if available
  useEffect(() => {
    if (!loanisLoading && loanData.length > 0) {
      const firstLoan = loanData.find((loan) => loan.customerId === id); // Find the first loan for the user
      if (firstLoan) {
        setInitialLoanData(firstLoan); // Set the first loan as initial data
      }
    }
  }, [loanData, loanisLoading, id]);

  const handleTheLoan = (loanID) => {
    const selectedLoan = loanData.find((item) => item.loanId === loanID); // Find the selected loan
    if (selectedLoan) {
      setInitialLoanData(selectedLoan); // Update initial loan data with the selected loan
    }
  };

  const totalAmount = () => {
    if (!initialLoanData) {
      return 0;
    }

    const { repaymentMethod, totalInstallment, loanAmount, interest } = initialLoanData;

    let timeInMonths;

    const parsedTotalInstallment = Number(totalInstallment);
    const parsedLoanAmount = Number(loanAmount);
    const parsedInterest = Number(interest);

    if (repaymentMethod === "daily") {
      timeInMonths = parsedTotalInstallment / 30; // assuming 30 days in a month
    } else if (repaymentMethod === "weekly") {
      timeInMonths = parsedTotalInstallment / 4; // assuming 4 weeks in a month
    } else if (repaymentMethod === "monthly") {
      timeInMonths = parsedTotalInstallment;
    }

    let totalWithInterest = parsedLoanAmount + (parsedLoanAmount * parsedInterest * timeInMonths) / 100;

    const roundedTotal = parseFloat(totalWithInterest.toFixed(2));
    return roundedTotal;
  };



  if (loanisLoading || !initialLoanData) {
    return <div>Loading...</div>; // Optionally handle loading state
  }

  // Filter user-specific loan data for display
  const userLoanData = loanData.filter((item) => item.customerId === id);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <div>
            <div className="flex items-center gap-3 pb-4">
              <div className="flex">
                <Link href="/dashboard/loans" className="text-blue-600 hover:text-blue-700 flex items-center mr-3">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{initialLoanData.name}</h1>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-md">
                    Loan id :{initialLoanData.loanId}
                  </span>
                </div>
              </div>
            </div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-gray-600 mb-1">Total loan amount</div>
                    <div className="text-2xl font-bold flex items-center">
                      <IndianRupee className="w-4 h-4 " />
                      {initialLoanData.loanAmount}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Total repayment</div>
                    <div className="text-2xl font-bold flex items-center"><IndianRupee className="w-4 h-4 " />{totalAmount()}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Outstanding balance</div>
                    <div className="text-2xl font-bold flex items-center"><IndianRupee className="w-4 h-4 " /> -0.01</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Loan term</div>
                    <div className="text-2xl font-bold">{initialLoanData.totalInstallment} months</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded-lg w-[20vw]">
              <div className="flex gap-3">
                <div className="text-sm w-1/2 text-gray-600">LOAN ID</div>
                <div className="text-sm w-1/2 text-gray-600">AMOUNT</div>
              </div>
              {userLoanData.map((loan, index) => (
                <div className="flex gap-3" key={index} onClick={() => handleTheLoan(loan.loanId)}>
                  <div className="font-semibold w-1/2">{loan.loanId}</div>
                  <div className="font-semibold w-1/2">{loan.loanAmount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general" className="text-base">
              General Info
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-base">
              Payment Schedule
            </TabsTrigger>
            <TabsTrigger value="history" className="text-base">
              History
            </TabsTrigger>
            {/* <TabsTrigger value="documents" className="text-base">
              Documents
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="general">
            <GeneralInfo loanData={initialLoanData} totalAmount={totalAmount()} />
          </TabsContent>

          <TabsContent value="schedule">
            <PaymentSchedule loanData={initialLoanData} />
          </TabsContent>

          <TabsContent value="history">
            <PaymentHistory loanData={initialLoanData} />
          </TabsContent>

          {/* <TabsContent value="documents">
            <Documents loanData={initialLoanData} />
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
