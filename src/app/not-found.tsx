import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <p>404</p>
      <h1>A small detour.</h1>
      <Link href="/">Back to the homepage</Link>
    </main>
  );
}
