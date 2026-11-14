import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="page wrap">
      <Link className="back" href="/">
        Back to all characters
      </Link>
      <div className="section-head">
        <h1>About Ricklepedia</h1>
      </div>
      <div className="cel prose">
        <p>
          Ricklepedia is a fan-made index of Rick and Morty characters and episodes. You can search the cast, filter it by
          status, species and gender, and keep favorites in your browser.
        </p>
        <p>
          The records come from the <a href="https://rickandmortyapi.com/">Rick and Morty API</a>, which covers seasons 1 to 5.
        </p>
        <p>
          Built by Mustafa Eftekin. More of my work is on <a href="https://github.com/eftekin">GitHub</a> and at{" "}
          <a href="https://eftekin.dev">eftekin.dev</a>.
        </p>
      </div>
    </div>
  );
}
