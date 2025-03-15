
import React from 'react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col items-center justify-center gap-4 text-center md:gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DSA Visualizer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
