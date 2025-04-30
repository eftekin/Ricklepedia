"use client";

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('name') || '');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or remove name parameter
    if (searchQuery) {
      params.set('name', searchQuery);
    } else {
      params.delete('name');
    }
    
    // Reset to page 1 when searching
    params.delete('page');
    
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    
    const params = new URLSearchParams(searchParams.toString());
    params.delete('name');
    params.delete('page');
    
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative flex w-full max-w-sm items-center">
      <Input
        type="text"
        placeholder="Search characters..."
        className="pr-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      {searchQuery && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-8 hover:bg-transparent"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
      
      <Button 
        type="submit" 
        variant="ghost" 
        size="sm" 
        className="absolute right-0"
        disabled={isPending}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}