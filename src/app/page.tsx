import ExternalLink from "@/components/ExternalLink";
import MeanCurve from "@/components/MeanCurve";
export default function Home() {
  return (
    <>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title">
            A software studio with
            <br className="desktop-break" /> the occasional good
            idea.
          </h1>
          <MeanCurve />
          <div className="hero-meadow">
            <p className="hero-tagline">
              Useful tools for an average world that still feels extraordinary.
            </p>
          </div>
        </section>
        <div className="studio-story shell">
          <section id="about">
            <p>
              Pretty Average Software is a small engineering studio for
              cloud infrastructure and developer tools. We hope you
              enjoy what we have to share, but we also won&apos;t feel bad if
              you don&apos;t.
            </p>
          </section>
          <section id="who" aria-labelledby="who-title">
            <h2 id="who-title">Who we are</h2>
            <p>
              Just me, Adrian Ross, the average engineer. I like to build things.
            </p>
            <ExternalLink href="https://adrianmross.com">
              More about Adrian
            </ExternalLink>
          </section>
          <section id="contact" aria-labelledby="contact-title">
            <h2 id="contact-title">Contact</h2>
            <p>We&apos;re just getting started.</p>
            <ExternalLink href="https://adrianmross.com">
              Find Adrian at adrianmross.com
            </ExternalLink>
          </section>
        </div>
      </main>
    </>
  );
}
