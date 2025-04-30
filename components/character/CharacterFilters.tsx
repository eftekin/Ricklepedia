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
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Filters:</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
        <Select 
          value={filters.status} 
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="alive">Alive</SelectItem>
            <SelectItem value="dead">Dead</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={filters.species} 
          onValueChange={(value) => handleFilterChange('species', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Species" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Species</SelectItem>
            <SelectItem value="human">Human</SelectItem>
            <SelectItem value="alien">Alien</SelectItem>
            <SelectItem value="humanoid">Humanoid</SelectItem>
            <SelectItem value="poopybutthole">Poopybutthole</SelectItem>
            <SelectItem value="mythological">Mythological</SelectItem>
            <SelectItem value="robot">Robot</SelectItem>
            <SelectItem value="animal">Animal</SelectItem>
            <SelectItem value="cronenberg">Cronenberg</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={filters.gender} 
          onValueChange={(value) => handleFilterChange('gender', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="genderless">Genderless</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        variant="ghost" 
        onClick={clearFilters}
        disabled={filters.status === 'all' && filters.species === 'all' && filters.gender === 'all'}
        className="whitespace-nowrap"
      >
        Clear Filters
      </Button>
    </div>
  );
}