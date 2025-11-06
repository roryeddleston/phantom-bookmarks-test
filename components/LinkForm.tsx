"use client";
import { useState } from "react";

export default function LinkForm({
  onSubmit,
  cta = "Add",
}: {
  onSubmit: (url: string) => void;
  cta?: string;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function normalizeUrl(raw: string) {
    const trimmed = raw.trim();
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    return new URL(withProtocol).toString();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const url = normalizeUrl(value);
      onSubmit(url);
      setValue("");
      setError(null);
    } catch {
      setError("Please enter a valid URL.");
    }
  }

  const isEmpty = value.trim().length === 0;

  return (
    <form onSubmit={handleSubmit} className="container" noValidate>
      <label htmlFor="bookmark-url" className="label">
        Add a bookmark
      </label>
      <div className="row">
        <input
          id="bookmark-url"
          className="input"
          placeholder="e.g. example.com/article"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={!!error}
          aria-describedby={error ? "url-error" : undefined}
          inputMode="url"
          autoComplete="off"
        />
        <button className="btn" type="submit" disabled={isEmpty}>
          {cta}
        </button>
      </div>
      {error && (
        <p id="url-error" className="helper" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
