import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks — Phantom Test",
  description: "Front-end only bookmarks app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="root">
        <div className="shell">
          <header className="topbar" role="banner">
            <h1 className="h1">Bookmarks</h1>
            <nav aria-label="Primary">
              <ul className="nav">
                <li>
                  <Link href="/">Overview</Link>
                </li>
                <li>
                  <Link href="/submit">Submit</Link>
                </li>
              </ul>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
