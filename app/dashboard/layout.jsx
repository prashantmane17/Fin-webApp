import { Sidebar } from "@/components/layout/sidebar";
import { InvestmentProvider } from "../../context/InvestmentContext";

export default function RootLayout({ children }) {
  return (
    <>
      <InvestmentProvider>
        <div className="flex flex-col md:flex-row h-screen bg-muted/5">
          <Sidebar className=" border-r bg-background block" />
          <div className="h-screen overflow-y-auto w-full">{children}</div>
        </div>
      </InvestmentProvider>
    </>
  );
}
