"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
const InvestmentContext = createContext();

export const InvestmentProvider = ({ children }) => {
  const { userData } = useUser();
  const [investmentData, setInvestmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userData.id) return;

    const fetchInvestmentData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("dtatat-----", userData.id);
        const response = await fetch(`/api/userControll/${userData.id}`, {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch investment data"
          );
        }

        const data = await response.json();
        console.log(data);
        setInvestmentData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestmentData();
  }, [userData.id]);

  return (
    <InvestmentContext.Provider
      value={{ investmentData, loading, error, setInvestmentData }}
    >
      {children}
    </InvestmentContext.Provider>
  );
};

export const useInvestment = () => {
  const context = useContext(InvestmentContext);

  if (!context) {
    throw new Error("useInvestment must be used within an InvestmentProvider");
  }

  return context;
};
