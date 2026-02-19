import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Appsidebar from "./items-sidebar";
interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <SidebarProvider>
      <Appsidebar />
      <main className="min-w-0 flex-1">
        <div className="mr-4 flex items-center gap-2 p-2">
          <SidebarTrigger aria-label="Alternar sidebar" />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
