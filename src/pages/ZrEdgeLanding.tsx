import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ChevronDown,
  Instagram,
  Mail,
  Menu,
  X,
  Scale,
  Building2,
  Code2,
  MapPinned,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

/* ------------------------------------------------------------------ */
/* Content — edit these arrays to change the site copy                  */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Solutions", href: "#solutions" },
  { label: "For Law Firms", href: "#law-firms" },
  { label: "For Companies", href: "#companies" },
  { label: "About Us", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const SOLUTIONS = [
  {
    id: "law-firms",
    icon: Scale,
    title: "For Law Firms",
    description:
      "Automated due-diligence packages for property and infrastructure disputes. We pull, cross-reference and verify SN/WN network records so your team stops manually browsing Geoportal.",
    points: ["Case-ready evidence reports", "Parcel & easement conflict detection", "Verified source references"],
    accent: "blue" as const,
  },
  {
    id: "companies",
    icon: Building2,
    title: "For Businesses & Investors",
    description:
      "Site feasibility and utility-risk screening at portfolio scale. Know what runs under a plot before you commit capital — in hours, not weeks.",
    points: ["Utility & network exposure scoring", "Bulk plot screening", "Investment-grade PDF deliverables"],
    accent: "orange" as const,
  },
  {
    id: "custom",
    icon: Code2,
    title: "Custom Software & GIS Solutions",
    description:
      "Bespoke geospatial pipelines, dashboards and APIs built around your data model. From scraping and normalisation to interactive internal tooling.",
    points: ["Custom filters & data schemas", "API + dashboard delivery", "Ongoing pipeline maintenance"],
    accent: "blue" as const,
  },
];

const STATS = [
  { value: "12x", label: "Faster than manual Geoportal search" },
  { value: "99.2%", label: "Record match accuracy" },
  { value: "SN / WN", label: "Full network coverage" },
  { value: "<24h", label: "Standard report turnaround" },
];

const VALUES = [
  {
    icon: MapPinned,
    title: "Geospatial first",
    body: "Every deliverable is grounded in verifiable coordinates, parcels and network geometry — never guesswork.",
  },
  {
    icon: ShieldCheck,
    title: "Evidence you can defend",
    body: "Each data point carries its source and retrieval timestamp, so it holds up in a filing or a boardroom.",
  },
  {
    icon: Zap,
    title: "Automation over admin",
    body: "We replace hours of manual portal clicking with pipelines that run in the background and alert on change.",
  },
];

const POSTS = [
  {
    date: "12 Aug 2026",
    tag: "GIS",
    title: "Why manual Geoportal search is costing your team days",
    excerpt:
      "A breakdown of the hidden hours legal and technical teams lose to portal navigation — and what an automated pipeline replaces.",
  },
  {
    date: "28 Jul 2026",
    tag: "Data quality",
    title: "SN and WN coverage: what the records actually tell you",
    excerpt:
      "Network registries are inconsistent by design. Here is how we normalise, deduplicate and confidence-score every record.",
  },
  {
    date: "09 Jul 2026",
    tag: "Case study",
    title: "Screening 340 plots for an infrastructure investor in one week",
    excerpt:
      "How bulk utility-risk screening surfaced three high-exposure sites before contracts were signed.",
  },
];

const FAQS = [
  {
    q: "How accurate is the data in a ZR EDGE report?",
    a: "Every record is pulled directly from official registries and cross-checked against secondary sources. Each entry carries its source reference and retrieval timestamp, plus a confidence score where registries conflict. Our current match accuracy sits at 99.2% across audited samples.",
  },
  {
    q: "What SN / WN network coverage do you provide?",
    a: "We cover the full sewage (SN) and water (WN) network layers available through the national geoportal, including line geometry, diameters, materials and operator attribution where published. Gaps in the source registry are flagged explicitly rather than silently omitted.",
  },
  {
    q: "Can I request custom filters or data fields?",
    a: "Yes. Custom filters are part of our standard workflow — filter by parcel size, network proximity, operator, easement presence, zoning class or any attribute present in the source data. If a field is not published, we will tell you upfront what can be derived instead.",
  },
  {
    q: "How fast is a standard report delivered?",
    a: "Single-site reports are typically delivered within 24 hours. Bulk screening timelines depend on volume, but a 300+ plot portfolio is usually complete within a week.",
  },
  {
    q: "Can ZR EDGE integrate with our internal systems?",
    a: "We deliver via PDF, spreadsheet, GeoJSON or a direct API feed into your existing stack. Custom dashboards and internal tooling are available through our custom software service.",
  },
  {
    q: "Do you offer a free sample report?",
    a: "Yes — send us a single address or parcel reference and we will return a full sample report so you can evaluate the depth and formatting before committing.",
  },
];

const FOOTER_LINKS = [
  {
    heading: "Solutions",
    links: [
      { label: "For Law Firms", href: "#law-firms" },
      { label: "For Companies", href: "#companies" },
      { label: "Custom GIS", href: "#solutions" },
      { label: "Sample Report", href: "#contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function ZrLogo({ className = "" }: { className?: string }) {
  // Replace this svg with an <img src="/your-logo.svg" alt="ZR EDGE" /> when ready.
  return (
    <a href="#home" className={`flex items-center gap-2.5 ${className}`} aria-label="ZR EDGE home">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="32" height="32" rx="9" stroke="url(#zrStroke)" strokeWidth="1.5" />
        <path d="M11 12h12l-12 10h12" stroke="url(#zrStroke)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="zrStroke" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(var(--zr-blue))" />
            <stop offset="1" stopColor="hsl(var(--zr-orange))" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-lg font-extrabold tracking-tight text-zr-text">
        ZR<span className="zr-gradient-text"> EDGE</span>
      </span>
    </a>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("zr-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`zr-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center rounded-full border border-zr-line bg-zr-surface px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zr-blue">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-zr-text sm:text-4xl md:text-[2.75rem]">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-zr-muted">{subtitle}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-zr-line/80 bg-zr-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <ZrLogo />

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zr-muted transition-colors hover:text-zr-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-zr-text shadow-[var(--zr-glow-blue)] transition-transform duration-200 hover:scale-[1.03] sm:inline-flex"
            style={{ backgroundImage: "var(--zr-gradient)" }}
          >
            Get Free Sample Report
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zr-line text-zr-text transition-colors hover:bg-zr-surface xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-in menu */}
      <div
        className={`fixed inset-0 top-[72px] z-40 bg-zr-bg/70 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`fixed right-0 top-[72px] z-50 h-[calc(100dvh-72px)] w-[82%] max-w-sm border-l border-zr-line bg-zr-surface/95 px-6 py-8 backdrop-blur-xl transition-transform duration-300 ease-out xl:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-zr-muted transition-colors hover:bg-white/5 hover:text-zr-text"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-6 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-zr-text"
          style={{ backgroundImage: "var(--zr-gradient)" }}
        >
          Get Free Sample Report
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-[72px]">
      <div className="pointer-events-none absolute inset-0 zr-grid-bg" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-[130px]"
        style={{ backgroundImage: "var(--zr-gradient)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-zr-line bg-zr-surface px-3.5 py-1.5 text-xs font-semibold text-zr-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-zr-orange" />
                Automated GIS &amp; infrastructure intelligence
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-zr-text sm:text-5xl lg:text-6xl">
                Infrastructure data,
                <br />
                <span className="zr-gradient-text">decoded automatically.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zr-muted">
                ZR EDGE turns fragmented geoportal registries into verified, case-ready reports. No more manual searching,
                tab-juggling or screenshotting parcel maps — our pipelines pull, cross-check and score every SN/WN record for you.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-zr-text shadow-[var(--zr-glow-blue)] transition-transform duration-200 hover:scale-[1.03]"
                  style={{ backgroundImage: "var(--zr-gradient)" }}
                >
                  Get Free Sample Report
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#solutions"
                  className="inline-flex items-center justify-center rounded-xl border border-zr-line bg-zr-surface px-6 py-3.5 text-sm font-semibold text-zr-text transition-colors hover:border-zr-blue/60 hover:bg-white/5"
                >
                  Explore Solutions
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <dl className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="text-2xl font-extrabold tracking-tight text-zr-text">{s.value}</dt>
                    <dd className="mt-1 text-xs leading-snug text-zr-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Glassmorphism dashboard mockup */}
          <Reveal delay={200}>
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-[2rem] opacity-30 blur-3xl"
                style={{ backgroundImage: "var(--zr-gradient)" }}
                aria-hidden="true"
              />
              <div className="zr-glass relative rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-zr-orange/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="ml-3 font-mono text-[11px] text-zr-muted">zr-edge / parcel-scan</span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { k: "Parcels scanned", v: "1,284" },
                    { k: "SN conflicts", v: "37" },
                    { k: "Confidence", v: "99.2%" },
                  ].map((c) => (
                    <div key={c.k} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <p className="text-[11px] uppercase tracking-wide text-zr-muted">{c.k}</p>
                      <p className="mt-1 text-xl font-bold text-zr-text">{c.v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-zr-text">Network overlay</p>
                    <span className="rounded-md bg-zr-blue/15 px-2 py-0.5 font-mono text-[10px] text-zr-blue">LIVE</span>
                  </div>
                  <svg viewBox="0 0 320 130" className="mt-3 h-32 w-full" role="img" aria-label="Simplified network overlay chart">
                    <defs>
                      <linearGradient id="zrArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--zr-blue))" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="hsl(var(--zr-blue))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[0, 1, 2, 3].map((i) => (
                      <line key={i} x1="0" y1={26 * i + 14} x2="320" y2={26 * i + 14} stroke="hsl(var(--zr-line))" strokeWidth="1" />
                    ))}
                    <path d="M0 100 L52 78 L104 88 L156 46 L208 60 L260 28 L320 40 L320 130 L0 130 Z" fill="url(#zrArea)" />
                    <path
                      d="M0 100 L52 78 L104 88 L156 46 L208 60 L260 28 L320 40"
                      fill="none"
                      stroke="hsl(var(--zr-blue))"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 118 L52 108 L104 112 L156 96 L208 104 L260 84 L320 92"
                      fill="none"
                      stroke="hsl(var(--zr-orange))"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="mt-3 space-y-2">
                  {[
                    { id: "PL-0472", status: "Verified", tone: "blue" },
                    { id: "PL-0518", status: "Conflict", tone: "orange" },
                  ].map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                    >
                      <span className="font-mono text-xs text-zr-muted">{r.id}</span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                          r.tone === "blue" ? "bg-zr-blue/15 text-zr-blue" : "bg-zr-orange/15 text-zr-orange"
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="relative border-t border-zr-line/70 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Solutions"
          title={<>Built for the teams that <span className="zr-gradient-text">live in the data</span></>}
          subtitle="Three ways ZR EDGE removes manual geoportal work from your workflow — pick the one that matches your mandate."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.id} delay={i * 100}>
              <article
                id={s.id}
                className="zr-glass group h-full scroll-mt-24 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                    s.accent === "blue" ? "bg-zr-blue/15 text-zr-blue" : "bg-zr-orange/15 text-zr-orange"
                  }`}
                >
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-zr-text">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zr-muted">{s.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-zr-muted">
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                          s.accent === "blue" ? "bg-zr-blue" : "bg-zr-orange"
                        }`}
                      />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-zr-text transition-colors hover:text-zr-blue"
                >
                  Request a sample
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative scroll-mt-20 border-t border-zr-line/70 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-zr-line bg-zr-surface px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zr-orange">
              About Us
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-zr-text sm:text-4xl">
              A small team obsessed with <span className="zr-gradient-text">clean spatial data</span>
            </h2>
            {/* PLACEHOLDER: replace with your company backstory */}
            <p className="mt-5 text-base leading-relaxed text-zr-muted">
              ZR EDGE started when a handful of engineers and analysts got tired of watching skilled professionals spend
              entire afternoons clicking through public geoportals to answer a single question about a plot of land.
            </p>
            <p className="mt-4 text-base leading-relaxed text-zr-muted">
              {/* PLACEHOLDER: add your mission, founding year, location and team story here */}
              Today we build the automation layer between fragmented public registries and the people who need answers
              from them — law firms, investors and infrastructure operators.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl border border-zr-line bg-zr-surface px-5 py-3 text-sm font-semibold text-zr-text transition-colors hover:border-zr-orange/60 hover:bg-white/5"
            >
              Talk to the team
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <div className="grid gap-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 110}>
                <div className="zr-glass flex gap-4 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-zr-blue">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zr-text">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zr-muted">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="relative scroll-mt-20 border-t border-zr-line/70 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Blog"
          title={<>Notes from the <span className="zr-gradient-text">data pipeline</span></>}
          subtitle="Field notes, methodology breakdowns and case studies from our GIS and engineering work."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 100}>
              <article className="zr-glass group h-full overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20">
                {/* PLACEHOLDER: swap this block for <img src="..." alt="..." loading="lazy" /> */}
                <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-white/10 bg-white/[0.02]">
                  <div className="absolute inset-0 zr-grid-bg opacity-60" aria-hidden="true" />
                  <div
                    className="absolute -bottom-10 left-1/2 h-32 w-52 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
                    style={{ backgroundImage: "var(--zr-gradient)" }}
                    aria-hidden="true"
                  />
                  <span className="relative rounded-md border border-white/10 bg-zr-bg/60 px-2.5 py-1 font-mono text-[11px] text-zr-muted">
                    {post.tag}
                  </span>
                </div>
                <div className="p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-zr-muted">{post.date}</p>
                  <h3 className="mt-2.5 text-lg font-bold leading-snug text-zr-text">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zr-muted">{post.excerpt}</p>
                  <a
                    href="#blog"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-zr-blue transition-colors hover:text-zr-orange"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-20 border-t border-zr-line/70 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Questions we get <span className="zr-gradient-text">every week</span></>}
        />

        <div className="mt-14 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div className={`zr-glass overflow-hidden rounded-2xl transition-colors ${isOpen ? "border-zr-blue/40" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-base font-semibold text-zr-text">{item.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-zr-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-zr-blue" : ""}`}
                      />
                    </button>
                  </h3>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-zr-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    window.setTimeout(() => {
      setSending(false);
      form.reset();
      toast({
        title: "Message ready to send",
        description: "Thanks — we'll reply to your request within one business day.",
      });
    }, 700);
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zr-text placeholder:text-zr-muted/70 outline-none transition-colors focus:border-zr-blue/70 focus:bg-white/[0.06]";

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-zr-line/70 py-24 lg:py-32">
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-20 blur-[130px]"
        style={{ backgroundImage: "var(--zr-gradient)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-zr-line bg-zr-surface px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zr-blue">
              Contact
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-zr-text sm:text-4xl">
              Send one address. <span className="zr-gradient-text">Get a full report.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zr-muted">
              Tell us what you need to know about a parcel, a portfolio or a network layer. We'll return a free sample
              report so you can judge the depth of the data yourself.
            </p>

            <div className="mt-9 space-y-3">
              <a
                href="mailto:zr.edge@outlook.com"
                className="zr-glass flex items-center gap-4 rounded-2xl px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zr-blue/15 text-zr-blue">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-zr-muted">Email</span>
                  <span className="block text-sm font-semibold text-zr-text">zr.edge@outlook.com</span>
                </span>
              </a>
              <a
                href="https://instagram.com/zr.edge"
                target="_blank"
                rel="noopener noreferrer"
                className="zr-glass flex items-center gap-4 rounded-2xl px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zr-orange/15 text-zr-orange">
                  <Instagram className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-zr-muted">Instagram</span>
                  <span className="block text-sm font-semibold text-zr-text">zr.edge</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={handleSubmit} className="zr-glass rounded-2xl p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="zr-name" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zr-muted">
                    Full name
                  </label>
                  <input id="zr-name" name="name" required placeholder="Jane Kowalski" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="zr-email" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zr-muted">
                    Email
                  </label>
                  <input id="zr-email" name="email" type="email" required placeholder="you@firm.com" className={inputClass} />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="zr-company" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zr-muted">
                  Company / firm
                </label>
                <input id="zr-company" name="company" placeholder="Optional" className={inputClass} />
              </div>
              <div className="mt-4">
                <label htmlFor="zr-topic" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zr-muted">
                  I'm interested in
                </label>
                <select id="zr-topic" name="topic" className={inputClass} defaultValue="sample">
                  <option value="sample" className="bg-zr-surface">Free sample report</option>
                  <option value="law" className="bg-zr-surface">Law firm services</option>
                  <option value="business" className="bg-zr-surface">Business &amp; investor screening</option>
                  <option value="custom" className="bg-zr-surface">Custom software / GIS</option>
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="zr-message" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zr-muted">
                  Message
                </label>
                <textarea
                  id="zr-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Address, parcel reference or what you need to find out…"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-zr-text shadow-[var(--zr-glow-blue)] transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
                style={{ backgroundImage: "var(--zr-gradient)" }}
              >
                {sending ? "Sending…" : "Request Free Sample Report"}
                {!sending && <ArrowRight className="h-4 w-4" />}
              </button>
              <p className="mt-3 text-center text-xs text-zr-muted">
                Prefer email? Write to{" "}
                <a href="mailto:zr.edge@outlook.com" className="text-zr-blue hover:underline">
                  zr.edge@outlook.com
                </a>
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zr-line/70 bg-zr-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <ZrLogo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zr-muted">
              ZR EDGE automates GIS and infrastructure data analytics — turning fragmented public registries into verified,
              decision-ready reports for law firms, investors and operators.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="mailto:zr.edge@outlook.com"
                aria-label="Email ZR EDGE"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zr-line text-zr-muted transition-colors hover:border-zr-blue/60 hover:text-zr-text"
              >
                <Mail className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://instagram.com/zr.edge"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ZR EDGE on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zr-line text-zr-muted transition-colors hover:border-zr-orange/60 hover:text-zr-text"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-zr-text">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-zr-muted transition-colors hover:text-zr-text">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-zr-line/70 pt-6 sm:flex-row">
          <p className="text-xs text-zr-muted">© {new Date().getFullYear()} ZR EDGE. All rights reserved.</p>
          <p className="text-xs text-zr-muted">GIS &amp; infrastructure data analytics</p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

export default function ZrEdgeLanding() {
  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = previous;
    };
  }, []);

  return (
    <div className="zr-theme min-h-screen antialiased">
      <Header />
      <main>
        <Hero />
        <Solutions />
        <About />
        <Blog />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
