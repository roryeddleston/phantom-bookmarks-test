"use client";

import type { Bookmark } from "../types";

export default function BookmarkTable({
  items,
  onDelete,
}: {
  items: Bookmark[];
  onDelete?: (id: string) => void;
}) {
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
            items.map(({ id, url }) => (
              <tr key={id}>
                <td>
                  <a href={url} target="_blank" rel="noreferrer">
                    {url}
                  </a>
                </td>
                <td>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => onDelete?.(id)}
                    aria-label={`Delete ${url}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
