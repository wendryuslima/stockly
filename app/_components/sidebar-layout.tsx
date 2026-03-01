"use client";

import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Appsidebar from "./items-sidebar";
import type { ReactNode } from "react";

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayoutContent = ({ children }: SidebarLayoutProps) => {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleCloseSheet = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <>
      <Appsidebar onItemClick={handleCloseSheet} />
      <main className="min-w-0 flex-1">
        <div className="mr-4 flex items-center gap-2 p-2">
          <SidebarTrigger aria-label="Alternar sidebar" />
        </div>
        {children}
      </main>
    </>
  );
};

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <SidebarProvider>
      <SidebarLayoutContent>{children}</SidebarLayoutContent>
    </SidebarProvider>
  );
};

export default SidebarLayout;
