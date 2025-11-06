"use client";

import type { Bookmark } from "../types";

export default function BookmarkTable({ items }: { items: Bookmark[] }) {
  return (
    <div className="container">
      <table className="table" aria-label="Bookmarks">
        <caption
          className="helper"
          style={{ textAlign: "left", captionSide: "top" }}
        >
          Your bookmarks
        </caption>
        <thead>
          <tr>
            <th scope="col">URL</th>
            <th scope="col" style={{ width: 160 }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={2} className="helper">
                No bookmarks yet.
              </td>
            </tr>
          ) : (
            items.map((bookmark) => (
              <tr key={bookmark.id}>
                <td>
                  <a href={bookmark.url} target="_blank" rel="noreferrer">
                    {bookmark.url}
                  </a>
                </td>
                <td></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
