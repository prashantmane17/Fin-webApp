"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadLoanData } from "@/axios/loanApi";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const initialData = {
    id: null,
    email: null,
    name: null,
    companyName: null,
  };
  const router = useRouter();
  const [userData, setUserData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [loanisLoading, setLoanIsLoading] = useState(true);
  const [loanData, setLoanData] = useState([]);
  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/session", {
        credentials: "include",
      });

      if (!response.ok) {
        console.warn("Failed to fetch user data. Status:", response.status);
        setUserData(initialData);
        return;
      }

      const data = await response.json();

      if (data && data.success && data.user) {
        setUserData({
          id: data.user.id || null,
          email: data.user.email || null,
          name: data.user.name || null,
          companyName: data.user.companyName || null,
        });
      } else {
        console.warn("No valid user data received:", data);
        setUserData(initialData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(initialData);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLoanData = async () => {
    try {
      console.log("userData.....", userData.id);
      const response = await loadLoanData(userData.id);
      if (response.success) {
        setLoanData(response.loans);
      }
    } catch (error) {
      console.log("error to get data!!!!!");
    } finally {
      setLoanIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData.id) {
      fetchLoanData();
    }
  }, [userData]);

  const logoutUser = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      console.log("response-----", response);
      if (response.ok) {
        setUserData(initialData);
        console.log("User logged out successfully");

        router.push("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        setLoanData,
        loanData,
        userData,
        loanisLoading,
        isLoading,
        logoutUser,
        fetchUserData,
        fetchLoanData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
