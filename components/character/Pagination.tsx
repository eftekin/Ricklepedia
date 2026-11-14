import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  /** the current query without `page` */
  query?: string;
  baseUrl?: string;
}

// first, last and two either side of the current page; 0 marks a gap
export function pageNumbers(current: number, total: number): number[] {
  const pages = new Set([1, total]);
  for (let i = current - 2; i <= current + 2; i++) if (i > 1 && i < total) pages.add(i);
  const sorted = Array.from(pages).sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? [0, p] : [p]));
}

export default function Pagination({ totalPages, currentPage, query = "", baseUrl = "/" }: PaginationProps) {
  if (totalPages <= 1) return null;

  const href = (page: number) => {
    const params = new URLSearchParams(query);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return `${baseUrl}${qs ? `?${qs}` : ""}#cast`;
  };

  return (
    <nav className="pager" aria-label="Pages">
      {currentPage > 1 ? <Link href={href(currentPage - 1)}>Previous</Link> : <span aria-disabled="true">Previous</span>}
      {pageNumbers(currentPage, totalPages).map((page, i) =>
        page === 0 ? (
          <span key={`gap-${i}`} aria-hidden="true">
            …
          </span>
        ) : (
          <Link key={page} href={href(page)} aria-current={page === currentPage ? "page" : undefined} className="num">
            {page}
          </Link>
        )
      )}
      {currentPage < totalPages ? <Link href={href(currentPage + 1)}>Next</Link> : <span aria-disabled="true">Next</span>}
    </nav>
  );
}
