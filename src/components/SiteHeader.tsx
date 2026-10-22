import Link from "next/link";
import LogoDots from "./LogoDots";
export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav-shell shell">
        <Link
          href="/"
          className="identity"
          aria-label="Pretty Average Software home"
        >
          <LogoDots />
          <span translate="no">Pretty Average Software</span>
        </Link>
        <nav aria-label="Main navigation">
          {[
            ["About", "/#about"],
            ["Contact", "/#contact"],
          ].map(([title, href]) => (
            <Link key={href} href={href}>
              {title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
