import Link from "next/link";
import DisplayControls from "./DisplayControls";
export default function SiteFooter() {
  return (
    <footer className="footer shell">
      <span translate="no">Pretty Average Software</span>
      <div className="footer-links">
        <Link href="/#contact">Contact</Link>
      </div>
      <DisplayControls />
    </footer>
  );
}
