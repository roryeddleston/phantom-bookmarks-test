"use client";

import Link from "next/link";

export default function Pagination({
  page,
  total,
  perPage,
}: {
  page: number;
  total: number;
  perPage: number;
}) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  if (pages <= 1) return null;

  const numbers = Array.from({ length: pages }, (_, i) => i + 1);
  const href = (p: number) => (p === 1 ? "/" : `/?page=${p}`);

  return (
    <nav className="row" aria-label="Pagination">
      <Link
        className="btn"
        href={href(Math.max(1, page - 1))}
        aria-label="Previous page"
      >
        « Prev
      </Link>
      {numbers.map((n) => (
        <Link
          key={n}
          className="btn"
          href={href(n)}
          aria-current={n === page ? "page" : undefined}
        >
          {n}
        </Link>
      ))}
      <Link
        className="btn"
        href={href(Math.min(pages, page + 1))}
        aria-label="Next page"
      >
        Next »
      </Link>
    </nav>
  );
}
