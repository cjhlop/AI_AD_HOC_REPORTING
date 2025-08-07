import React from 'react';
import Sidebar from '@/components/Sidebar';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className={cn("flex-1 overflow-y-auto transition-all duration-300", isCollapsed ? "md:ml-20" : "md:ml-64")}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;