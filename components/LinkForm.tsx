"use client";

import { useId, useState } from "react";

export default function LinkForm({
  onSubmit,
  cta = "Add",
  initialValue,
  label = "Add a bookmark",
}: {
  onSubmit: (url: string) => void;
  cta?: string;
  initialValue?: string;
  label?: string;
}) {
  const [value, setValue] = useState(initialValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

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
      <label htmlFor={inputId} className="label">
        {label}
      </label>
      <div className="row">
        <input
          id={inputId}
          type="url"
          className="input"
          placeholder="e.g. example.com/article"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          inputMode="url"
          autoComplete="off"
        />
        <button className="btn" type="submit" disabled={isEmpty}>
          {cta}
        </button>
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          className="helper"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </form>
  );
}
