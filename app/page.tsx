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

  return (
    <main>
      <LinkForm onSubmit={add} />
      <div style={{ height: 12 }} />
      <BookmarkTable items={items} />
    </main>
  );
}
