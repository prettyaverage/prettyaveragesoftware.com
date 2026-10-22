# Pretty Average Software design

The selected header mark is four filled dots around an outlined center. SVG circles use currentColor in both strictly monochrome themes. The tab favicon uses an outlined STIX Two Math italic x with an overbar, with a slightly smaller, heavier x and a thicker overbar separated by a clearer gap; no runtime font is needed. Apple and 32px derivatives use the same mathematical glyph. Social artwork keeps the five-dot identity.

Light tokens: paper #f6f6f6, ink #171717, muted #626262, line #d8d8d8, panel #ebebeb. Dark tokens: paper #151515, ink #f1f1f1, muted #aaaaaa, line #383838, panel #242424. IBM Plex Sans is locally bundled.

The studio is a single page with About, Who we are, and Contact sections beneath the unchanged hero, in a restrained 820px reading column. Old page and alias URLs redirect directly to the homepage. The sitemap lists only the canonical homepage. No products, services, pricing or availability are advertised.

External links use the exact leading 12px SVG redirect arrow from adrianmross, rather than a font-dependent trailing glyph.

The subtitle-only hero has a full-width Gaussian curve with no grid, axes, labels, or promo panel. All dots use the exact same sampled coordinates as the SVG line, including during spring motion and resize. Pointer attraction is disabled until the initial 4.4-second arrival and limited to 12% of cursor displacement. A damped spring adds acceleration, friction, and a small overshoot on return.

The first dot falls vertically from the left logo. Its accelerating fall ends in two diminishing bounces and a short rest before it rolls up the exact curve. Renewals alternate between a drop above the right side and another left-logo drop. They meet the spring-driven resident where it currently is, including during cursor attraction. The old dot fades as the incoming dot covers it, then four faint flecks disperse in a small fizzle. The header dot grows back. The cadence is nine seconds; the line shimmers every fourteen seconds at 35% of its former peak opacity.

Adrian Ross appears in the About section as “The average engineer.”

Automatic motion pauses outside the viewport or in a hidden tab. Reduced motion renders a resting point, retaining immediate keyboard interaction. A single sun/moon button toggles appearance. Hover or keyboard focus nearby reveals a small pause/resume button with a minimal tooltip; touch devices keep it visible. Both settings persist in the footer. A small early script sets the saved theme before the page paints.

Reusable vectors live in public/brand; curve-geometry.ts is the sole geometry for the interactive hero. No animation library or GIF is used.
