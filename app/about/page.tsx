import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link href="/" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Characters
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        About Ricklepedia
      </h1>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <p className="text-lg mb-4">
            Ricklepedia is a web application designed to showcase characters from the popular animated 
            series Rick and Morty. The application provides an intuitive interface to explore, search, 
            and filter characters from the multiverse.
          </p>
          
          <p className="text-lg mb-4">
            This project uses the <a href="https://rickandmortyapi.com/" target="_blank" rel="noreferrer" className="text-chart-1 hover:underline inline-flex items-center">
              Rick and Morty API <ExternalLink className="h-4 w-4 ml-1" />
            </a> to fetch character data and presents it in a user-friendly manner.
          </p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Browse all characters from the Rick and Morty universe</li>
            <li>Search for specific characters by name</li>
            <li>Filter characters by status, species, and gender</li>
            <li>View detailed information about each character</li>
            <li>Save your favorite characters</li>
            <li>Dark/light mode support</li>
            <li>Fully responsive design</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-3">Technologies Used</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Next.js 13 with App Router</li>
            <li>TypeScript for type safety</li>
            <li>Tailwind CSS for styling</li>
            <li>shadcn/ui for UI components</li>
            <li>Rick and Morty API for character data</li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          Check out the Rick and Morty API:
        </p>
        <a href="https://rickandmortyapi.com/" target="_blank" rel="noreferrer">
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Rick and Morty API
          </Button>
        </a>
      </div>
    </div>
  );
}