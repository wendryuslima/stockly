import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Appsidebar from "./items-sidebar";
interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <SidebarProvider
      className=""
      style={
        {
          "--sidebar-width": "16rem",
        } as React.CSSProperties
      }
    >
      <Appsidebar />
      <main className="">
        <div className="mr-4 hidden items-center gap-2 md:flex">
          <SidebarTrigger aria-label="Alternar sidebar" />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
