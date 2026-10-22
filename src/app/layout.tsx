import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
const sans = localFont({
  src: [
    { path: "../fonts/plex-regular.woff2", weight: "400" },
    { path: "../fonts/plex-medium.woff2", weight: "500" },
  ],
  variable: "--font-sans",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://prettyaveragesoftware.com"),
  title: "Pretty Average Software",
  description:
    "Just your average software studio.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Pretty Average Software",
    title: "Pretty Average Software",
    description:
      "Just your average software studio.",
    images: [
      {
        url: "/brand/social.png",
        width: 1200,
        height: 630,
        alt: "Pretty Average Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pretty Average Software",
    description:
      "Just your average software studio.",
    images: ["/brand/social.png"],
  },
};
const appearanceScript = `(function(){try{var t=localStorage.getItem('site-theme-v1')||'system';document.documentElement.dataset.theme=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.dataset.motion=localStorage.getItem('site-motion-v1')||'running'}catch(e){document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}})()`;
export const viewport: Viewport = { themeColor: "#f6f6f6" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={sans.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
