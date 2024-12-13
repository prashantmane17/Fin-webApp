import { Sidebar } from "@/components/layout/sidebar";

export default function RootLayout({ children }) {
  return (
    <>
      <div className="flex h-screen bg-muted/5">
        <Sidebar className="w-[13rem] border-r bg-background hidden md:block" />
        <div className="h-screen overflow-y-auto w-full">{children}</div>
      </div>
    </>
  );
}
