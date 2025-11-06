"use client";

import { useState } from "react";
import type { Bookmark } from "../types";

export default function BookmarkTable({
  items,
  onDelete,
}: {
  items: Bookmark[];
  onDelete?: (id: string) => void;
}) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

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
            <th scope="col" style={{ width: 220 }}>
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
            items.map(({ id, url }) => (
              <tr key={id}>
                <td>
                  <a href={url} target="_blank" rel="noreferrer">
                    {url}
                  </a>
                </td>
                <td>
                  {confirmingId === id ? (
                    <div className="row">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => onDelete?.(id)}
                        aria-label={`Confirm delete ${url}`}
                        autoFocus
                      >
                        Confirm
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => setConfirmingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setConfirmingId(id)}
                      aria-label={`Delete ${url}`}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
