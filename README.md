Bookmarks — Solution Overview

How it works
• App shell & routing: Next.js (App Router) with a shared layout (header + nav). Pages: Overview (/), Submit (/submit), Result (/result).
• State & persistence: Client-side React state backed by localStorage via tiny helper functions. Changes sync across tabs using the storage event.
• Data model: Minimal Bookmark { id: string; url: string }. New items are prepended so page 1 shows the latest.
• Forms: One reusable LinkForm:
• Normalizes input (adds https:// if missing).
• Reused button for inline Edit (pre-filled value, “Save” CTA).
• Table UI: BookmarkTable shows URL + Actions. Delete uses inline Confirm/Cancel although style/layout could definitely be improved.
• Pagination: Query-param based (?page=…), slices client-side, and bounces to a valid page if you delete the last item on the last page.
• Routig details: useSearchParams is wrapped in <Suspense> where used.

Tech used
• Next.js (App Router), React, TypeScript
• Local storage
• Globals.css for styles
• ESLint + Stylelint

Limitations
• Client-only storage (no accounts, no sharing, last-write-wins across tabs).
• Validation is basic: syntax + simple domain check; doesn’t prove the URL actually exists.
• Style is basic and overall design could be improved.
• Currently no unit tests.
• Console has some lint warnings that need to be resolved, I focused on the main fucntionality.

Nice future improvements
• Check URL valid using a tiny API route (server HEAD/GET with redirects/timeout), dedupe links.
• Search, sort, tags, and import/export (JSON).
• Undo delete and keyboard shortcuts.
• Add unit tests.
• Organised stylesheets.
