"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Bookmark } from "../types";
import LinkForm from "../components/LinkForm";
import BookmarkTable from "../components/BookmarkTable";
import Pagination from "../components/Pagination";
import { load, upsert, removeById, STORAGE_KEY } from "../lib/storage";

const PER_PAGE = 20;

function OverviewInner() {
  // Initialize from storage (not inside an effect)
  const [items, setItems] = useState<Bookmark[]>(() => load());
  const params = useSearchParams();
  const router = useRouter();
  const page = Math.max(1, Number(params.get("page") || "1"));

  // Cross-tab sync only (no initial setState here)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(load());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function add(url: string) {
    const id = crypto.randomUUID();
    const next = upsert(items, { id, url });
    setItems(next);
    // Show newest on page 1
    if (page !== 1) router.push("/");
  }

  function removeByIdHandler(id: string) {
    const next = removeById(items, id);
    setItems(next);

    // If we deleted the last row on the last page, bounce back
    const totalPages = Math.max(1, Math.ceil(next.length / PER_PAGE));
    if (page > totalPages) {
      router.push(totalPages === 1 ? "/" : `/?page=${totalPages}`);
    }
  }

  function editUrl(id: string, url: string) {
    setItems(upsert(items, { id, url }));
  }

  const total = items.length;
  const current = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return items.slice(start, start + PER_PAGE);
  }, [items, page]);

  return (
    <main>
      <h2>Overview</h2>
      <LinkForm onSubmit={add} />
      <div style={{ height: 12 }} />
      <BookmarkTable
        items={current}
        onDelete={removeByIdHandler}
        onEdit={editUrl}
      />
      <div style={{ height: 12 }} />
      <Pagination page={page} total={total} perPage={PER_PAGE} />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <main>
          <h2>Overview</h2>
          <p className="helper">Loading…</p>
        </main>
      }
    >
      <OverviewInner />
    </Suspense>
  );
}
