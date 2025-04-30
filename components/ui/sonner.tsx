"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#1a1a1a] group-[.toaster]:text-[#98fffd] group-[.toaster]:border-[#00ffd1]/20 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[#98fffd]/80",
          actionButton: "group-[.toast]:bg-[#00ffd1] group-[.toast]:text-black",
          cancelButton: "group-[.toast]:bg-[#1a1a1a] group-[.toast]:text-[#98fffd]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
