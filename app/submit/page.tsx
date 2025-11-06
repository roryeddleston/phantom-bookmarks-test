"use client";

import { useRouter } from "next/navigation";
import LinkForm from "../../components/LinkForm";
import { load, upsert } from "../../lib/storage";

export default function SubmitPage() {
  const router = useRouter();

  function create(url: string) {
    const id = crypto.randomUUID();
    const all = load();
    upsert(all, { id, url });
    router.push(`/result?url=${encodeURIComponent(url)}`);
  }

  return (
    <main>
      <h2>Submit a link</h2>
      <LinkForm onSubmit={create} cta="Submit" />
    </main>
  );
}
