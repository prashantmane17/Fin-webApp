"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PiggyBank, Shield, Users, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <PiggyBank className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              ChitFund Pro
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-primary/10">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-muted">
            🚀 Trusted by 1000+ businesses across India
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-purple-600">
              Secure & Transparent <br />
              Chit Fund Management
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Streamline your chit fund operations with our comprehensive platform. Manage members,
              track payments, and grow your business with ease.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 space-y-16">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Secure & Reliable",
              description: "Bank-grade security for all your transactions and member data",
              gradient: "from-blue-500/10 to-blue-600/10",
              iconGradient: "from-blue-500 to-blue-600",
            },
            {
              icon: Users,
              title: "Member Management",
              description: "Efficiently manage members, payments, and documentation",
              gradient: "from-purple-500/10 to-purple-600/10",
              iconGradient: "from-purple-500 to-purple-600",
            },
            {
              icon: TrendingUp,
              title: "Growth Analytics",
              description: "Track performance with detailed analytics and reports",
              gradient: "from-green-500/10 to-green-600/10",
              iconGradient: "from-green-500 to-green-600",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br ${feature.gradient} border border-muted transition-transform hover:scale-105`}
            >
              <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r ${feature.iconGradient} mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="container py-16 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Why Choose ChitFund Pro?</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Join thousands of satisfied customers who trust us with their chit fund management
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Real-time Payment Tracking",
            "Automated Reminders",
            "Secure Data Storage",
            "Mobile Responsive",
            "24/7 Customer Support",
            "Regular Updates",
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 p-4 rounded-lg border bg-card">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}