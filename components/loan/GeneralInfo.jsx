"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function GeneralInfo({ loanData, totalAmount }) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-gray-600 mb-1">Total loan amount</div>
                                <div className="font-semibold">₹ {loanData.loanAmount}</div>
                            </div>
                            <div>
                                <div className="text-gray-600 mb-1">Interest</div>
                                <div className="font-semibold">{loanData.interest}%</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-gray-600 mb-1">Loan term</div>
                                <div className="font-semibold">{loanData.totalInstallment} months</div>
                            </div>
                            <div>
                                <div className="text-gray-600 mb-1">Monthly Installment</div>
                                <div className="font-semibold">₹ {loanData.installmentAmount}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-gray-600 mb-1">Total repayment</div>
                                <div className="font-semibold">₹ 33,753.19</div>
                            </div>
                            <div>
                                <div className="text-gray-600 mb-1">Total Paid Amount</div>
                                <div className="font-semibold">₹ {totalAmount}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-gray-600 mb-1">Payment method</div>
                                <div className="font-semibold">{loanData.paymentMethod}</div>
                            </div>
                            <div>
                                <div className="text-gray-600 mb-1">Processing Fee</div>
                                <div className="font-semibold">{loanData.processingFee}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-gray-600 mb-1">Issue date</div>
                                <div className="font-semibold">30-Nov-2024</div>
                            </div>
                            <div>
                                <div className="text-gray-600 mb-1">Email</div>
                                <div className="font-semibold">--</div>
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-600 mb-1">Phone number</div>
                            <div className="font-semibold">8431187297</div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-gray-600 mb-1 block">Address</label>
                            <Input placeholder="Enter address" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-600 mb-1 block">City</label>
                                <Input placeholder="Enter city" />
                            </div>
                            <div>
                                <label className="text-gray-600 mb-1 block">State / Province</label>
                                <Input placeholder="Enter state" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-600 mb-1 block">Country</label>
                                <Input placeholder="Enter country" />
                            </div>
                            <div>
                                <label className="text-gray-600 mb-1 block">ZIP / Postal</label>
                                <Input placeholder="Enter ZIP code" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button>Save</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}