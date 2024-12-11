import React from 'react';

// Utility Functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'overdue':
      return 'bg-red-100 text-red-800';
    case 'partial':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const calculateTotalPaid = (payments) => {
  return payments.reduce((sum, payment) => sum + payment.amount, 0);
};

const calculateRemainingAmount = (loanAmount, totalPaid) => {
  return loanAmount - totalPaid;
};

const calculateProgress = (totalPaid, loanAmount) => {
  return (totalPaid / loanAmount) * 100;
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
// Components
function PaymentCard({ date, amount, status, borrower, paymentMethod }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="mb-2 sm:mb-0">
          <p className="text-sm text-gray-500">{formatDate(date)}</p>
          <p className="font-medium text-gray-900">{borrower}</p>
        </div>
        <div className="flex flex-col sm:items-end">
          <p className="text-lg font-semibold text-gray-900">{formatCurrency(amount)}</p>
          <p className="text-sm text-gray-500">{paymentMethod}</p>
        </div>
      </div>
      <div className="mt-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function LoanSummaryCard({ title, amount, description, className }) {
  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm ${className}`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{formatCurrency(amount)}</p>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
  );
}

function PaymentProgressBar({ totalPaid, loanAmount }) {
  const progress = calculateProgress(totalPaid, loanAmount);
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function LoanDetails({ loan }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Borrower</p>
          <p className="font-medium text-gray-900">{loan.borrowerName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Loan Amount</p>
          <p className="font-medium text-gray-900">{formatCurrency(loan.amount)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Start Date</p>
          <p className="font-medium text-gray-900">{formatDate(loan.startDate)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Due Date</p>
          <p className="font-medium text-gray-900">{formatDate(loan.dueDate)}</p>
        </div>
      </div>
    </div>
  );
}

// Mock Data
const loanData = {
  id: 1,
  borrowerName: 'John Doe',
  amount: 10000,
  startDate: '2024-01-01',
  dueDate: '2024-12-31',
  interestRate: 5,
};

const recentPayments = [
  {
    id: 1,
    date: '2024-03-15',
    amount: 1000,
    status: 'Paid',
    borrower: 'John Doe',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 2,
    date: '2024-02-15',
    amount: 1000,
    status: 'Paid',
    borrower: 'John Doe',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 3,
    date: '2024-01-15',
    amount: 800,
    status: 'Partial',
    borrower: 'John Doe',
    paymentMethod: 'Cash',
  },
  {
    id: 4,
    date: '2023-12-15',
    amount: 1000,
    status: 'Paid',
    borrower: 'John Doe',
    paymentMethod: 'Bank Transfer',
  },
];

// Main Page Component
export default function Page() {
  const totalPaid = calculateTotalPaid(recentPayments);
  const remainingAmount = calculateRemainingAmount(loanData.amount, totalPaid);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Loan Payment Tracker</h1>
          <p className="text-gray-600 mt-1">Monitor loan payments and progress</p>
        </div>

        <LoanDetails loan={loanData} />
        
        <div className="mb-6">
          <PaymentProgressBar totalPaid={totalPaid} loanAmount={loanData.amount} />
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <LoanSummaryCard 
            title="Total Loan Amount"
            amount={loanData.amount}
          />
          <LoanSummaryCard 
            title="Total Paid"
            amount={totalPaid}
            className="bg-green-50"
          />
          <LoanSummaryCard 
            title="Remaining Amount"
            amount={remainingAmount}
            className="bg-blue-50"
          />
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
          </div>
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <PaymentCard
                key={payment.id}
                date={payment.date}
                amount={payment.amount}
                status={payment.status}
                borrower={payment.borrower}
                paymentMethod={payment.paymentMethod}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}