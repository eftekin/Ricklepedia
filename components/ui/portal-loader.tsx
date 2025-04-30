"use client";

import { cn } from "@/lib/utils";

interface PortalLoaderProps {
  className?: string;
}

export function PortalLoader({ className }: PortalLoaderProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        {/* Outer circle */}
        <div className="absolute inset-0 border-4 border-chart-1 rounded-full animate-[spin_3s_linear_infinite]" />
        
        {/* Middle circle */}
        <div className="absolute inset-2 border-4 border-chart-2 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
        
        {/* Inner circle */}
        <div className="absolute inset-4 border-4 border-chart-4 rounded-full animate-[spin_1.5s_linear_infinite]" />
        
        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-chart-5 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}