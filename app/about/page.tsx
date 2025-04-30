import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl text-[#00ff9f] font-mono">
      <Link
        href="/"
        className="inline-flex items-center mb-6 text-[#9cf7f7] hover:text-[#ffffff]"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Characters
      </Link>

      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-[#00ffd1]">
        About Ricklepedia
      </h1>

      <Card className="mb-8 border border-[#00ffd1] bg-[#0a0a0a] shadow-lg">
        <CardContent className="p-6">
          <p className="text-lg mb-4 font-semibold italic text-center text-[#98fffd]">
            🧪 Why “Ricklepedia”? — It’s not just an app, it’s a multiversal knowledge
            vault. Inspired by the quirky brilliance of Rick Sanchez and the boundless
            weirdness of the show, Ricklepedia offers a unique blend of fun and
            functionality for fans and devs alike.
          </p>
          <p className="text-center mb-6 text-[#c3f7f5] italic">
            “Sometimes science is more art than science, Morty.” — Rick
          </p>

          <p className="text-lg mb-4">
            Ricklepedia is a fan-made web app that lets you explore characters from the
            Rick and Morty multiverse. From Morties to Meeseeks, it's all here — fast,
            searchable, and weirdly accurate.
          </p>

          <p className="text-lg mb-4">
            Data is fetched from the{" "}
            <a
              href="https://rickandmortyapi.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[#00ffd1] hover:underline inline-flex items-center"
            >
              Rick and Morty API <ExternalLink className="h-4 w-4 ml-1" />
            </a>{" "}
            and presented with a clean and responsive interface.
          </p>

          <h2 className="text-2xl font-bold mt-6 mb-3 text-[#00ffd1]">About Me</h2>
          <p className="text-lg mb-2">
            I'm <strong>Mustafa Eftekin</strong>, a Software Engineering student and
            aspiring full-stack developer passionate about AI, design, and pop culture
            tech projects like this one.
          </p>
          <p className="text-lg mb-4">
            Curious about my work?
            <br />
            <a
              href="https://github.com/eftekin"
              target="_blank"
              rel="noreferrer"
              className="text-[#00ffd1] hover:underline"
            >
              Visit my GitHub ↗
            </a>{" "}
            or check out my portfolio:&nbsp;
            <a
              href="https://eftekin.dev"
              target="_blank"
              rel="noreferrer"
              className="text-[#00ffd1] hover:underline"
            >
              eftekin.dev ↗
            </a>
          </p>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-muted-foreground mb-4 text-[#9cf7f7]">
          Explore the official Rick and Morty API:
        </p>
        <a href="https://rickandmortyapi.com/" target="_blank" rel="noreferrer">
          <Button
            variant="outline"
            className="gap-2 text-[#00ffd1] border-[#00ffd1] hover:bg-[#00ffd1] hover:text-black"
          >
            <ExternalLink className="h-4 w-4" />
            Rick and Morty API
          </Button>
        </a>
      </div>
    </div>
  );
}
