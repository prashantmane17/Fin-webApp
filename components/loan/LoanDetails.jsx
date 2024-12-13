"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoanHeader } from "./LoanHeader";
import { LoanSummary } from "./LoanSummary";
import { PaymentSchedule } from "./PaymentSchedule";
import { GeneralInfo } from "./GeneralInfo";
import { Documents } from "./Documents";
import { PaymentHistory } from "./PaymentHistory";

export default function LoanDetails() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <LoanHeader name="Navin J" loanId="LN-33698" />
        <LoanSummary />

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
            <TabsTrigger value="documents" className="text-base">
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralInfo />
          </TabsContent>

          <TabsContent value="schedule">
            <PaymentSchedule />
          </TabsContent>

          <TabsContent value="history">
            <PaymentHistory />
          </TabsContent>

          <TabsContent value="documents">
            <Documents />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
