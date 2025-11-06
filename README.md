Bookmarks — Solution Overview

What I built

A small, front-end–only bookmarks app that lets you add, edit, delete, and paginate links. It’s simple and fast, with a clean UI and accessible defaults.

How it works (design)
• App shell & routing: Next.js (App Router) with a shared layout (header + nav). Pages: Overview (/), Submit (/submit), Result (/result).
• State & persistence: Client-side React state backed by localStorage via tiny helper functions. Changes sync across tabs using the storage event.
• Data model: Minimal Bookmark { id: string; url: string }. New items are prepended so page 1 shows the latest.
• Forms: One reusable LinkForm:
• Normalizes input (adds https:// if missing) and applies a light domain guard (rejects single-word hosts).
• Clear, accessible label; single focus ring; button disabled when empty.
• Reused for inline Edit (pre-filled value, “Save” CTA).
• Table UI: BookmarkTable shows URL + Actions. Delete uses inline Confirm/Cancel (no browser alert). Edit swaps the row for LinkForm.
• Pagination: Query-param based (?page=…), slices client-side, and bounces to a valid page if you delete the last item on the last page.
• Routing details: useSearchParams is wrapped in <Suspense> where used; the Result page reads ?url= safely (client Suspense or server searchParams).

Tech used
• Next.js (App Router), React, TypeScript
• Local storage only (no backend)
• Lightweight globals.css styles
• ESLint (Flat Config) + Stylelint

Limitations
• Client-only storage (no accounts, no sharing, last-write-wins across tabs).
• Validation is basic: syntax + simple domain check; doesn’t prove the URL actually exists.
• No metadata (titles/favicons), no search/sort/tags yet.
• No tests (unit/E2E) in this slice.

Nice future improvements
• Reachability check via a tiny API route (server HEAD/GET with redirects/timeout), plus OG metadata (title + favicon); canonicalize and dedupe links.
• Search, sort, tags, and import/export (JSON).
• Undo delete and keyboard shortcuts.
• PWA (installable, offline) and an optional cloud sync later.
• Tests: unit (URL helpers), component (form/table), E2E (add/edit/delete/pagination).
