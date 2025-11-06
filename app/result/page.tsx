"use client";

import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const params = useSearchParams();
  const url = params.get("url") ?? "";

  return (
    <main className="container">
      <h2 style={{ marginTop: 0 }}>Thanks!</h2>
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
