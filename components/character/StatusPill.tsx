import { Character } from "@/types";

export default function StatusPill({ status }: { status: Character["status"] }) {
  const key = status.toLowerCase();
  return <span className={`status status--${key}`}>{status === "unknown" ? "Unknown" : status}</span>;
}
