"use client";

import { useState } from "react";
import type { Bookmark } from "../types";
import LinkForm from "../components/LinkForm";
import BookmarkTable from "../components/BookmarkTable";

export default function Page() {
  const [items, setItems] = useState<Bookmark[]>([]);

  function add(url: string) {
    const id = crypto.randomUUID();
    setItems([{ id, url }, ...items]);
  }

  function removeById(id: string) {
    setItems(items.filter((item) => item.id !== id));
  }

  function editUrl(id: string, url: string) {
    setItems(items.map((item) => (item.id === id ? { ...item, url } : item)));
  }

  return (
    <main>
      <h2>Overview</h2>
      <LinkForm onSubmit={add} />
      <div style={{ height: 12 }} />
      <BookmarkTable items={items} onDelete={removeById} onEdit={editUrl} />
    </main>
  );
}
