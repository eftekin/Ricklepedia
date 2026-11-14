import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <Image src="/logo.png" alt="Ricklepedia" width={1024} height={389} />
        <p>
          Records from <a href="https://rickandmortyapi.com">rickandmortyapi.com</a>, which stops at season 5.
        </p>
        <p>
          Built by <a href="https://github.com/eftekin">Mustafa Eftekin</a>
        </p>
      </div>
    </footer>
  );
}
