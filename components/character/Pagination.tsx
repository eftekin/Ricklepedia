"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    router.push(`/?${params.toString()}`);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const range = 2; // Number of pages to show on each side of current page
    let pages = [];
    
    // Always include first page
    pages.push(1);
    
    // Calculate range around current page
    let start = Math.max(2, currentPage - range);
    let end = Math.min(totalPages - 1, currentPage + range);
    
    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push(-1); // -1 represents ellipsis
    }
    
    // Add range pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push(-2); // -2 represents ellipsis
    }
    
    // Always include last page if it exists
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pages = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-1 md:gap-2 py-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(1)}
        disabled={currentPage === 1}
        className="hidden sm:flex"
      >
        <ChevronsLeft className="h-4 w-4" />
        <span className="sr-only">First page</span>
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      
      <div className="flex items-center gap-1 md:gap-2">
        {pages.map((page, index) => {
          // Render ellipsis
          if (page < 0) {
            return (
              <span key={`ellipsis-${index}`} className="w-8 text-center">
                ...
              </span>
            );
          }
          
          // Render page number
          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              onClick={() => navigate(page)}
              className="w-8 h-8"
            >
              {page}
            </Button>
          );
        })}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(totalPages)}
        disabled={currentPage === totalPages}
        className="hidden sm:flex"
      >
        <ChevronsRight className="h-4 w-4" />
        <span className="sr-only">Last page</span>
      </Button>
    </div>
  );
}