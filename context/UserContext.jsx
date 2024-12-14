"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const initialData = {
    id: null,
    email: null,
    name: null,
    companyName: null,
  };
  const [userData, setUserData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/session", {
        credentials: "include", // Include cookies for authentication
      });

      if (!response.ok) {
        console.warn("Failed to fetch user data. Status:", response.status);
        setUserData(initialData); // Reset state to initial
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
        console.log("User data fetched:", data.user);
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

  useEffect(() => {
    fetchUserData();
  }, []);

  //   const logoutUser = async () => {
  //     try {
  //       await fetch("/api/logout", {
  //         method: "POST",
  //         credentials: "include",
  //       });

  //       setUserData(initialData);
  //       console.log("User logged out successfully");

  //       const router = useRouter();
  //       router.push("/");
  //     } catch (error) {
  //       console.error("Error during logout:", error);
  //     }
  //   };

  return (
    <UserContext.Provider value={{ userData, isLoading }}>
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
