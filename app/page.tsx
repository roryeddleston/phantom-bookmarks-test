"use client";

import { useEffect, useState } from "react";
import type { Bookmark } from "../types";
import LinkForm from "../components/LinkForm";
import BookmarkTable from "../components/BookmarkTable";
import { load, upsert, removeById, STORAGE_KEY } from "../lib/storage";

export default function Page() {
  const [items, setItems] = useState<Bookmark[]>([]);

  // Load on mount + listen for changes from other tabs/windows
  useEffect(() => {
    setItems(load());

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setItems(load());
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function add(url: string) {
    const id = crypto.randomUUID();
    setItems(upsert(items, { id, url }));
  }

  function removeByIdHandler(id: string) {
    setItems(removeById(items, id));
  }

  function editUrl(id: string, url: string) {
    setItems(upsert(items, { id, url }));
  }

  return (
    <main>
      <h2>Overview</h2>
      <LinkForm onSubmit={add} />
      <div style={{ height: 12 }} />
      <BookmarkTable
        items={items}
        onDelete={removeByIdHandler}
        onEdit={editUrl}
      />
    </main>
  );
}
