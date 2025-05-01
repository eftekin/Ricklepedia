"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#00ffd1]/20"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-2 group">
          <Image
            src="/portal.gif"
            alt="Ricklepedia"
            width={50}
            height={40}
            className="group-hover:opacity-80 transition-opacity"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-[#98fffd] hover:text-[#ffffff] transition-colors text-sm font-medium"
          >
            Characters
          </Link>
          <Link
            href="/episodes"
            className="text-[#98fffd] hover:text-[#ffffff] transition-colors text-sm font-medium"
          >
            Episodes
          </Link>
          <Link
            href="/favorites"
            className="text-[#98fffd] hover:text-[#ffffff] transition-colors text-sm font-medium"
          >
            Favorites
          </Link>
          <Link
            href="/about"
            className="text-[#98fffd] hover:text-[#ffffff] transition-colors text-sm font-medium"
          >
            About
          </Link>
          <Link href="/" passHref>
            <Button className="bg-[#00ffd1] text-black hover:bg-[#98fffd] transition-colors">
              Browse Characters
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#98fffd] hover:text-[#ffffff]"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden p-4 pt-0 border-b border-[#00ffd1]/20 bg-[#0a0a0a]/95 backdrop-blur-sm">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="py-2 text-[#98fffd] hover:text-[#ffffff] transition-colors text-sm font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Characters
            </Link>
            <Link
              href="/episodes"
              className="py-2 text-[#98fffd] hover:text-[#ffffff] transition-colors text-sm font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Episodes
            </Link>
            <Link
              href="/favorites"
              className="py-2 text-[#98fffd] hover:text-[#ffffff] transition-colors text-sm font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link
              href="/about"
              className="py-2 text-[#98fffd] hover:text-[#ffffff] transition-colors text-sm font-medium"
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
