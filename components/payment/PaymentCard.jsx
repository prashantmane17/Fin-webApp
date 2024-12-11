import React from 'react';

export function PaymentCard({ date, amount, status, recipient, paymentMethod }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="mb-2 sm:mb-0">
          <p className="text-sm text-gray-500">{date}</p>
          <p className="font-medium text-gray-900">{recipient}</p>
        </div>
        <div className="flex flex-col sm:items-end">
          <p className="text-lg font-semibold text-gray-900">${amount}</p>
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