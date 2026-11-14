"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const STATUSES = [
  { value: "", label: "All" },
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];
const SPECIES = ["human", "alien", "humanoid", "poopybutthole", "mythological", "robot", "animal", "cronenberg"];
const GENDERS = ["female", "male", "genderless", "unknown"];
const title = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function CharacterFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");
  const lastName = useRef(name);

  // any filter change starts again from page 1
  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    const query = params.toString();
    router.push(query ? `/?${query}#cast` : "/#cast", { scroll: false });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (name !== lastName.current) {
        lastName.current = name;
        update("name", name.trim());
      }
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const status = searchParams.get("status") || "";

  return (
    <form className="filters" role="search" aria-label="Filter characters" onSubmit={(e) => e.preventDefault()}>
      <div className="field field--grow">
        <label className="label" htmlFor="f-name">
          Name
        </label>
        <input
          className="input"
          id="f-name"
          name="name"
          type="search"
          placeholder="Birdperson"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <fieldset className="field">
        <legend className="label">Status</legend>
        <div className="chips">
          {STATUSES.map((s) => (
            <label className="chip" key={s.value || "all"}>
              <input
                type="radio"
                name="status"
                value={s.value}
                checked={status === s.value}
                onChange={() => update("status", s.value)}
              />
              {s.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field">
        <label className="label" htmlFor="f-species">
          Species
        </label>
        <select
          className="select"
          id="f-species"
          name="species"
          value={searchParams.get("species") || ""}
          onChange={(e) => update("species", e.target.value)}
        >
          <option value="">Any</option>
          {SPECIES.map((s) => (
            <option key={s} value={s}>
              {title(s)}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label className="label" htmlFor="f-gender">
          Gender
        </label>
        <select
          className="select"
          id="f-gender"
          name="gender"
          value={searchParams.get("gender") || ""}
          onChange={(e) => update("gender", e.target.value)}
        >
          <option value="">Any</option>
          {GENDERS.map((g) => (
            <option key={g} value={g}>
              {title(g)}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
