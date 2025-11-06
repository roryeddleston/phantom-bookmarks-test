"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Bookmark } from "../types";
import LinkForm from "../components/LinkForm";
import BookmarkTable from "../components/BookmarkTable";
import Pagination from "../components/Pagination";
import { load, upsert, removeById, STORAGE_KEY } from "../lib/storage";

const PER_PAGE = 20;

export default function Page() {
  const [items, setItems] = useState<Bookmark[]>([]);
  const params = useSearchParams();
  const router = useRouter();
  const page = Math.max(1, Number(params.get("page") || "1"));

  useEffect(() => {
    setItems(load());

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
    // After adding, navigate to the first page to show the new item.
    if (page !== 1) router.push("/");
  }

  function removeByIdHandler(id: string) {
    const next = removeById(items, id);
    setItems(next);

    // Guard against removing the last item on the last page.
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
      <BookmarkTable
        items={current}
        onDelete={removeByIdHandler}
        onEdit={editUrl}
      />
      <Pagination page={page} total={total} perPage={PER_PAGE} />
    </main>
  );
}
