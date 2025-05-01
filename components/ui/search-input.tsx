"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("name") || "");
  const [isPending, startTransition] = useTransition();
  const previousSearchRef = useRef(searchQuery);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      // Only update if the search query has changed
      if (searchQuery !== previousSearchRef.current) {
        previousSearchRef.current = searchQuery;

        const params = new URLSearchParams(searchParams.toString());

        if (searchQuery) {
          params.set("name", searchQuery);
        } else {
          params.delete("name");
        }

        // Only reset page when search query changes
        params.delete("page");

        startTransition(() => {
          router.push(`/?${params.toString()}`);
        });
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, searchParams, router]);

  const clearSearch = () => {
    setSearchQuery("");
    previousSearchRef.current = "";

    const params = new URLSearchParams(searchParams.toString());
    params.delete("name");
    params.delete("page");

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <div className="relative flex w-full max-w-sm items-center">
      <Input
        type="text"
        placeholder="Search characters..."
        className="pr-10 border-[#00ffd1]/20 bg-[#0a0a0a] text-[#98fffd] placeholder:text-[#98fffd]/50 focus-visible:ring-[#00ffd1]/30 hover:border-[#00ffd1]/40"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {searchQuery && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-8 hover:bg-transparent text-[#98fffd] hover:text-[#ffffff]"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 text-[#98fffd] hover:text-[#ffffff]"
        disabled={isPending}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
}
