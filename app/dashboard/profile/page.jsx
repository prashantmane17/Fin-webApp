"use client";

import { ProfileHeader } from "@/components/profile/profile-header";
import { InvestmentSummary } from "@/components/profile/investment-summary";
import { SchemeList } from "@/components/profile/scheme-list";

export default function ProfilePage() {
  return (
    <main className="flex-1 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <ProfileHeader />
        <InvestmentSummary />
        <SchemeList />
      </div>
    </main>
  );
}
