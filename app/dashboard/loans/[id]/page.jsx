"use client";

import { useParams } from "next/navigation";

const LoanDetails = () => {
  const { id } = useParams(); // Get the dynamic route parameter

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Loan Details</h1>
      <p className="text-gray-700">
        Showing details for Loan ID: <span className="font-bold">{id}</span>
      </p>
      {/* Replace the content below with your loan details logic */}
      <div className="mt-4">
        <p>
          Here, you can fetch and display details for the loan with ID: {id}.
        </p>
      </div>
    </div>
  );
};

export default LoanDetails;
