export default function ResultPage({
  searchParams,
}: {
  searchParams?: { url?: string };
}) {
  const url = searchParams?.url ?? "";

  return (
    <main className="container">
      <h2 style={{ marginTop: 0 }}>Thanks!</h2>
      {url ? (
        <p>
          You submitted:{" "}
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </p>
      ) : (
        <p>No URL provided.</p>
      )}
      <p>
        <a href="/">Back to overview</a>
      </p>
    </main>
  );
}
