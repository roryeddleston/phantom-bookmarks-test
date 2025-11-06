"use client";

import { useState } from "react";
import type { Bookmark } from "../types";
import LinkForm from "./LinkForm";

export default function BookmarkTable({
  items,
  onDelete,
  onEdit,
}: {
  items: Bookmark[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string, url: string) => void;
}) {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

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
            <th scope="col" style={{ width: 260 }}>
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
            items.map(({ id, url }) => {
              const isEditing = editingId === id;
              const isConfirming = confirmingId === id;

              return (
                <tr key={id}>
                  <td>
                    {isEditing ? (
                      <LinkForm
                        initialValue={url}
                        label="Edit bookmark"
                        cta="Save"
                        onSubmit={(newUrl) => {
                          onEdit?.(id, newUrl);
                          setEditingId(null);
                        }}
                      />
                    ) : (
                      <a href={url} target="_blank" rel="noreferrer">
                        {url}
                      </a>
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <button
                        className="btn"
                        type="button"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    ) : isConfirming ? (
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
                      <div className="row">
                        <button
                          className="btn"
                          type="button"
                          onClick={() => {
                            setEditingId(id);
                            setConfirmingId(null);
                          }}
                          aria-label={`Edit ${url}`}
                        >
                          Edit
                        </button>
                        <button
                          className="btn"
                          type="button"
                          onClick={() => {
                            setConfirmingId(id);
                            setEditingId(null);
                          }}
                          aria-label={`Delete ${url}`}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
