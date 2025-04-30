"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CharacterFilters } from '@/types';

export default function CharacterFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<CharacterFilters>({
    status: searchParams.get('status') || 'all',
    species: searchParams.get('species') || 'all',
    gender: searchParams.get('gender') || 'all',
  });

  const handleFilterChange = (key: keyof CharacterFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Keep page param if it exists and is not 1
    if (searchParams.has('page') && searchParams.get('page') !== '1') {
      params.set('page', searchParams.get('page')!);
    } else {
      params.delete('page');
    }
    
    // Keep search query if it exists
    if (searchParams.has('name')) {
      params.set('name', searchParams.get('name')!);
    }
    
    router.push(`/?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      status: 'all',
      species: 'all',
      gender: 'all',
    });
    
    const params = new URLSearchParams(searchParams.toString());
    params.delete('status');
    params.delete('species');
    params.delete('gender');
    
    // Keep search query if it exists
    if (searchParams.has('name')) {
      params.set('name', searchParams.get('name')!);
      router.push(`/?${params.toString()}`);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-end">
      <div className="flex items-center gap-2 text-[#98fffd]">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters:</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
        <Select 
          value={filters.status} 
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger className="border-[#00ffd1]/20 hover:border-[#00ffd1]/40 bg-[#0a0a0a] text-[#98fffd]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#0a0a0a] border-[#00ffd1]/20">
            <SelectItem value="all" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">All Statuses</SelectItem>
            <SelectItem value="alive" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Alive</SelectItem>
            <SelectItem value="dead" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Dead</SelectItem>
            <SelectItem value="unknown" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Unknown</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={filters.species} 
          onValueChange={(value) => handleFilterChange('species', value)}
        >
          <SelectTrigger className="border-[#00ffd1]/20 hover:border-[#00ffd1]/40 bg-[#0a0a0a] text-[#98fffd]">
            <SelectValue placeholder="Species" />
          </SelectTrigger>
          <SelectContent className="bg-[#0a0a0a] border-[#00ffd1]/20">
            <SelectItem value="all" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">All Species</SelectItem>
            <SelectItem value="human" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Human</SelectItem>
            <SelectItem value="alien" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Alien</SelectItem>
            <SelectItem value="humanoid" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Humanoid</SelectItem>
            <SelectItem value="poopybutthole" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Poopybutthole</SelectItem>
            <SelectItem value="mythological" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Mythological</SelectItem>
            <SelectItem value="robot" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Robot</SelectItem>
            <SelectItem value="animal" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Animal</SelectItem>
            <SelectItem value="cronenberg" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Cronenberg</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={filters.gender} 
          onValueChange={(value) => handleFilterChange('gender', value)}
        >
          <SelectTrigger className="border-[#00ffd1]/20 hover:border-[#00ffd1]/40 bg-[#0a0a0a] text-[#98fffd]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent className="bg-[#0a0a0a] border-[#00ffd1]/20">
            <SelectItem value="all" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">All Genders</SelectItem>
            <SelectItem value="female" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Female</SelectItem>
            <SelectItem value="male" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Male</SelectItem>
            <SelectItem value="genderless" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Genderless</SelectItem>
            <SelectItem value="unknown" className="text-[#98fffd] focus:bg-[#00ffd1]/10 focus:text-[#00ffd1]">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        variant="ghost" 
        onClick={clearFilters}
        disabled={filters.status === 'all' && filters.species === 'all' && filters.gender === 'all'}
        className="whitespace-nowrap text-[#98fffd] hover:text-[#ffffff] hover:bg-[#00ffd1]/10 disabled:text-[#98fffd]/50"
      >
        Clear Filters
      </Button>
    </div>
  );
}