"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Mail, Lock, Phone, Building2, PiggyBank } from "lucide-react";
import { addOwners } from "@/axios/auth";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function SignUpPage() {
  const intialData = {
    name: "",
    email: "",
    phone: "",
    companyName: "",
    password: "",
  };
  const [userData, setUserData] = useState(intialData);
  const [isloading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { fetchUserData } = useUser();

  const setformData = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setIsLoading(true);
      console.log(userData);
      await addOwners(userData);
      fetchUserData();
    } catch (error) {
      console.log("error----", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-primary to-blue-600 p-3 rounded-full">
              <PiggyBank className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Create an account
          </CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="Name"
                  type="text"
                  placeholder="Enter Your Name"
                  className="pl-10"
                  name="name"
                  value={userData.name}
                  onChange={setformData}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="pl-10"
                  name="email"
                  value={userData.email}
                  onChange={setformData}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="pl-10"
                  name="phone"
                  value={userData.phone}
                  onChange={setformData}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Company Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Enter Company Name"
                  className="pl-10"
                  name="companyName"
                  value={userData.companyName}
                  onChange={setformData}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="pl-10"
                  name="password"
                  value={userData.password}
                  onChange={setformData}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isloading}
              className="w-full mt-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
            >
              {isloading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
