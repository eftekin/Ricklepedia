"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/theme-toggle';
import { FlaskRound as Flask, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-sm border-b" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link 
          href="/"
          className="flex items-center space-x-2 group"
        >
          <Flask className="h-8 w-8 text-chart-1 group-hover:animate-pulse transition-all" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-chart-1 to-chart-2">
            Ricklepedia
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Characters
          </Link>
          <Link 
            href="/favorites" 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Favorites
          </Link>
          <Link 
            href="/about" 
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </Link>
          <ModeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-2"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden p-4 pt-0 border-b bg-background">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Characters
            </Link>
            <Link 
              href="/favorites" 
              className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link 
              href="/about" 
              className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}