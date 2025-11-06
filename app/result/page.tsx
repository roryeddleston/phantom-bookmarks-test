"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResultInner() {
  const params = useSearchParams();
  const url = params.get("url") ?? "";

  return (
    <main className="container">
      <h2 style={{ marginTop: 0 }}>Thank you for your submission!</h2>
      {url ? (
        <p>
          You submitted:{" "}
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </p>
      ) : (
        <p>
          No URL provided. <a href="/submit">Go back to submit</a>
        </p>
      )}
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="container">
          <h2 style={{ marginTop: 0 }}>Thank you for your submission!</h2>
          <p className="helper">Loading…</p>
        </main>
      }
    >
      <ResultInner />
    </Suspense>
  );
}
