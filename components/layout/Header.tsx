"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Characters" },
  { href: "/episodes", label: "Episodes" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [heroInView, setHeroInView] = useState(false);

  // one logo at a time: on the home page the bar's logo waits until the hero's has scrolled away
  useEffect(() => {
    document.documentElement.classList.add("js");
    const heroLogo = document.getElementById("hero-logo");
    if (!heroLogo || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting));
    observer.observe(heroLogo);
    return () => observer.disconnect();
  }, [pathname]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/character") : pathname.startsWith(href);

  return (
    <header className={heroInView && pathname === "/" ? "topbar hero-in-view" : "topbar"}>
      <div className="wrap">
        <Link className="home" href="/" aria-label="Ricklepedia home">
          <Image src="/logo.png" alt="" width={1024} height={389} priority />
        </Link>
        <nav className="nav" aria-label="Main">
          {links.map((link) => (
            <Link key={link.href} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
