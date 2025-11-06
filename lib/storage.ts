import type { Bookmark } from "../types";

const KEY = "phantom_bookmarks_v1";
export const STORAGE_KEY = KEY;

export function load(): Bookmark[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Bookmark[];
  } catch {
    return [];
  }
}

export function save(list: Bookmark[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function upsert(list: Bookmark[], item: Bookmark): Bookmark[] {
  const idx = list.findIndex((bookmark) => bookmark.id === item.id);
  const next =
    idx >= 0
      ? [...list.slice(0, idx), item, ...list.slice(idx + 1)]
      : [item, ...list];
  save(next);
  return next;
}

export function removeById(list: Bookmark[], id: string): Bookmark[] {
  const next = list.filter((bookmark) => bookmark.id !== id);
  save(next);
  return next;
}
