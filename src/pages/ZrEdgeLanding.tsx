import { useEffect, useRef, useState, type FormEvent } from "react";
import heroVisual from "@/assets/zr-hero-visual.jpg";
import {
  ArrowRight,
  ChevronDown,
  Instagram,
  Mail,
  Menu,
  X,
  Code2,
  Workflow,
  Layers,
  MapPinned,
  Scale,
  Building2,
  Truck,
  Factory,
  ShieldCheck,
  Rocket,
  Target,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import zrLogo from "@/assets/zr-edge-logo.png";

/* ==================================================================
   TRANSLATIONS — edit copy here. `pl` is the default language.
   Add a new key to both `pl` and `en` to keep the switcher in sync.
   ================================================================== */

type Lang = "pl" | "en";

const T = {
  pl: {
    nav: {
      home: "Strona Główna",
      services: "Usługi",
      industries: "Dla kogo",
      about: "O nas",
      blog: "Blog",
      faq: "FAQ",
      contact: "Kontakt",
    },
    headerCta: "Omów swój pomysł",
    hero: {
      badge: "Software house i agencja automatyzacji B2B",
      title1: "Dedykowane aplikacje i systemy B2B",
      title2: "uszyte na miarę Twojego biznesu",
      subtitle:
        "Tworzymy custom software, automatyzujemy procesy i skalujemy firmy z dowolnej branży. Zamieniamy skomplikowane wyzwania w intuicyjne narzędzia cyfrowe.",
      primary: "Skonsultuj projekt",
      secondary: "Zobacz rozwiązania",
      stats: [
        { value: "40+", label: "Wdrożonych systemów B2B" },
        { value: "12x", label: "Szybsze procesy po automatyzacji" },
        { value: "6 tyg.", label: "Średni czas do pierwszego MVP" },
        { value: "24/7", label: "Monitoring i wsparcie" },
      ],
      mock: {
        title: "zr-edge / panel-operacyjny",
        cards: [
          { k: "Procesy zautomatyzowane", v: "1 284" },
          { k: "Godziny odzyskane / mies.", v: "376" },
          { k: "SLA", v: "99,9%" },
        ],
        chart: "Wydajność wdrożenia",
        live: "NA ŻYWO",
        rows: [
          { id: "JOB-0472", status: "Zakończone" },
          { id: "JOB-0518", status: "W kolejce" },
        ],
      },
    },
    services: {
      eyebrow: "Rozwiązania",
      title1: "Cztery filary, na których ",
      title2: "budujemy Twój software",
      subtitle:
        "Od pierwszego warsztatu po utrzymanie produkcyjne — projektujemy, budujemy i rozwijamy systemy, które realnie zwracają się w kosztach operacyjnych.",
      items: [
        {
          title: "Custom Software",
          sub: "Aplikacje dedykowane na wymiar",
          desc: "Systemy webowe, panele klienta i narzędzia wewnętrzne projektowane pod Twój model działania — bez kompromisów gotowych szablonów.",
          points: ["Aplikacje webowe i portale B2B", "Panele administracyjne i CRM", "Integracje API i ERP"],
        },
        {
          title: "Automatyzacja procesów",
          sub: "Automatyzacja procesów operacyjnych",
          desc: "Eliminujemy ręczną pracę: obieg dokumentów, raportowanie, synchronizacja danych między systemami i powiadomienia.",
          points: ["Workflow i obieg dokumentów", "Automatyczne raporty i alerty", "Integracje między systemami"],
        },
        {
          title: "Skalowanie i modernizacja",
          sub: "Rozbudowa i modernizacja systemów IT",
          desc: "Przejmujemy legacy, porządkujemy architekturę i przygotowujemy system na kolejny rząd wielkości ruchu i danych.",
          points: ["Audyt i refaktoryzacja", "Migracje do chmury", "Wydajność i bezpieczeństwo"],
        },
        {
          title: "Data Science i GIS",
          sub: "Zaawansowana analityka danych i systemy przestrzenne",
          desc: "Pipeline'y danych, dashboardy decyzyjne oraz analizy geoprzestrzenne — od pozyskania danych po gotowy raport.",
          points: ["Dashboardy i modele predykcyjne", "Analizy GIS i mapy", "Automatyczne pozyskiwanie danych"],
        },
      ],
    },
    industries: {
      eyebrow: "Dla kogo pracujemy",
      title1: "Jedna inżynieria, ",
      title2: "wiele branż B2B",
      subtitle: "Pracujemy tam, gdzie procesy są złożone, a dane rozproszone.",
      items: [
        {
          title: "Kancelarie i usługi profesjonalne",
          desc: "Systemy obsługi spraw, automatyczna analiza dokumentów i raporty due diligence.",
        },
        {
          title: "Nieruchomości i GIS",
          desc: "Analizy działek, warstwy sieciowe, scoring lokalizacji i mapy decyzyjne.",
        },
        {
          title: "Logistyka i e-commerce",
          desc: "Integracje magazynowe, automatyzacja zamówień i panele operacyjne w czasie rzeczywistym.",
        },
        {
          title: "Produkcja i przedsiębiorstwa B2B",
          desc: "Cyfryzacja hali produkcyjnej, monitoring KPI i integracje z systemami ERP/MES.",
        },
      ],
    },
    about: {
      eyebrow: "O nas",
      title1: "Zespół inżynierski, który ",
      title2: "liczy zwrot z inwestycji",
      p1: "ZR EDGE to zespół inżynierów i analityków budujący oprogramowanie dedykowane dla firm B2B. Nie sprzedajemy godzin — dostarczamy systemy, które skracają procesy i obniżają koszty operacyjne.",
      p2: "Pracujemy w krótkich iteracjach: warsztat, prototyp, wdrożenie produkcyjne. Każdy etap kończy się działającym oprogramowaniem, które możesz zweryfikować w swojej organizacji.",
      cta: "Porozmawiaj z zespołem",
      values: [
        { title: "ROI ponad funkcje", body: "Każdy moduł ma uzasadnienie biznesowe: oszczędzony czas, mniej błędów lub nowy przychód." },
        { title: "Bezpieczeństwo od pierwszego dnia", body: "Kontrola dostępu, szyfrowanie i zgodność z RODO wbudowane w architekturę, nie doklejane na końcu." },
        { title: "Skalowalność bez przepisywania", body: "Projektujemy architekturę tak, aby rozwój systemu nie oznaczał startu od zera za dwa lata." },
      ],
    },
    blog: {
      eyebrow: "Baza wiedzy",
      title1: "Aktualności i ",
      title2: "notatki inżynierskie",
      subtitle: "Praktyczne materiały o custom software, automatyzacji i analityce danych.",
      readMore: "Czytaj więcej",
      posts: [
        {
          date: "12 sierpnia 2026",
          tag: "Automatyzacja",
          title: "Ile realnie kosztuje ręczny proces w firmie B2B",
          excerpt: "Prosty model liczenia strat na powtarzalnej pracy i moment, w którym automatyzacja zwraca się w kilka miesięcy.",
        },
        {
          date: "28 lipca 2026",
          tag: "Custom software",
          title: "Gotowy system czy aplikacja dedykowana? Krótka checklista",
          excerpt: "Siedem pytań, które warto sobie zadać, zanim podpiszesz kolejną licencję na narzędzie, które prawie pasuje.",
        },
        {
          date: "9 lipca 2026",
          tag: "Case study",
          title: "Panel operacyjny, który skrócił obsługę zlecenia o 68%",
          excerpt: "Jak integracja rozproszonych arkuszy i systemu ERP zmieniła codzienną pracę zespołu logistyki.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title1: "Pytania, które słyszymy ",
      title2: "najczęściej",
      items: [
        {
          q: "Ile trwa stworzenie dedykowanego oprogramowania?",
          a: "Działający MVP dostarczamy zwykle w 6–10 tygodni od warsztatu startowego. Pełne wdrożenie produkcyjne zależy od zakresu integracji, ale pracujemy w dwutygodniowych iteracjach, więc pierwsze efekty widzisz już po kilkunastu dniach.",
        },
        {
          q: "W jakich technologiach pracujecie?",
          a: "Frontend: React i TypeScript. Backend: Node.js i Python. Bazy danych: PostgreSQL wraz z warstwą PostGIS dla danych przestrzennych. Infrastruktura chmurowa, CI/CD i monitoring są standardowym elementem każdego wdrożenia.",
        },
        {
          q: "Jak dbacie o bezpieczeństwo danych?",
          a: "Szyfrowanie danych w tranzycie i w spoczynku, role oraz kontrola dostępu na poziomie rekordu, pełny audyt operacji i zgodność z RODO. Na życzenie podpisujemy NDA oraz umowę powierzenia przetwarzania danych przed rozpoczęciem prac.",
        },
        {
          q: "Które procesy najczęściej się automatyzuje?",
          a: "Obieg i akceptacja dokumentów, generowanie ofert i raportów, synchronizacja danych między CRM, ERP i arkuszami, powiadomienia o statusach oraz cykliczne pozyskiwanie danych z portali zewnętrznych.",
        },
        {
          q: "Czy przejmujecie istniejący, starszy system?",
          a: "Tak. Zaczynamy od audytu kodu i architektury, następnie proponujemy plan modernizacji — od stopniowej refaktoryzacji po migrację do nowej architektury bez przestoju w działaniu firmy.",
        },
        {
          q: "Co dzieje się po wdrożeniu?",
          a: "Zapewniamy utrzymanie, monitoring i rozwój systemu w modelu abonamentowym. Otrzymujesz pełne prawa do kodu oraz dokumentację techniczną — bez uzależnienia od jednego dostawcy.",
        },
      ],
    },
    contact: {
      eyebrow: "Kontakt",
      title1: "Opisz wyzwanie. ",
      title2: "Odeślemy plan działania.",
      subtitle:
        "Napisz, jaki proces chcesz usprawnić lub jaki system zbudować. Odpowiadamy w ciągu jednego dnia roboczego wraz z wstępnym zakresem i szacunkiem czasu.",
      emailLabel: "E-mail",
      igLabel: "Instagram",
      form: {
        name: "Imię i nazwisko",
        namePh: "Jan Kowalski",
        email: "E-mail",
        emailPh: "ty@firma.pl",
        industry: "Branża",
        industries: ["Kancelaria / usługi profesjonalne", "Nieruchomości / GIS", "Logistyka / e-commerce", "Produkcja / przemysł", "Inna branża"],
        message: "Wiadomość",
        messagePh: "Opisz krótko proces lub system, nad którym chcesz pracować…",
        submit: "Wyślij zapytanie",
        sending: "Wysyłanie…",
        prefer: "Wolisz e-mail? Napisz na",
      },
      toastTitle: "Dziękujemy za wiadomość",
      toastDesc: "Odezwiemy się w ciągu jednego dnia roboczego.",
    },
    footer: {
      bio: "ZR EDGE projektuje i buduje dedykowane oprogramowanie B2B, automatyzuje procesy operacyjne oraz dostarcza zaawansowaną analitykę danych i systemy GIS.",
      navHeading: "Nawigacja",
      legalHeading: "Informacje",
      nav: [
        { label: "Rozwiązania", href: "#services" },
        { label: "Dla kancelarii", href: "#industries" },
        { label: "Dla firm", href: "#industries" },
        { label: "O nas", href: "#about" },
        { label: "Kontakt", href: "#contact" },
        { label: "FAQ", href: "#faq" },
      ],
      legal: [
        { label: "Polityka prywatności", href: "#contact" },
        { label: "Cookies", href: "#contact" },
      ],
      rights: "© 2026 ZR EDGE. Wszystkie prawa zastrzeżone.",
      tagline: "Custom software i automatyzacja B2B",
    },
  },

  en: {
    nav: {
      home: "Home",
      services: "Services",
      industries: "Industries",
      about: "About Us",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact",
    },
    headerCta: "Discuss your idea",
    hero: {
      badge: "B2B software house & automation agency",
      title1: "Custom applications and B2B systems",
      title2: "tailored to your business",
      subtitle:
        "We build custom software, automate operations and scale companies across every industry. We turn complex challenges into intuitive digital tools.",
      primary: "Book a consultation",
      secondary: "See our solutions",
      stats: [
        { value: "40+", label: "B2B systems delivered" },
        { value: "12x", label: "Faster processes after automation" },
        { value: "6 wks", label: "Average time to first MVP" },
        { value: "24/7", label: "Monitoring and support" },
      ],
      mock: {
        title: "zr-edge / operations-panel",
        cards: [
          { k: "Processes automated", v: "1,284" },
          { k: "Hours saved / month", v: "376" },
          { k: "SLA", v: "99.9%" },
        ],
        chart: "Deployment performance",
        live: "LIVE",
        rows: [
          { id: "JOB-0472", status: "Completed" },
          { id: "JOB-0518", status: "Queued" },
        ],
      },
    },
    services: {
      eyebrow: "Solutions",
      title1: "Four pillars we ",
      title2: "build your software on",
      subtitle:
        "From the first workshop to production maintenance — we design, build and grow systems that pay for themselves in operating costs.",
      items: [
        {
          title: "Custom Software",
          sub: "Bespoke applications built to fit",
          desc: "Web systems, client portals and internal tools designed around how you actually operate — no off-the-shelf compromises.",
          points: ["Web apps and B2B portals", "Admin panels and CRM", "API and ERP integrations"],
        },
        {
          title: "Process Automation",
          sub: "Automation of operational processes",
          desc: "We remove manual work: document flows, reporting, data synchronisation between systems and status notifications.",
          points: ["Workflow and document routing", "Automated reports and alerts", "System-to-system integrations"],
        },
        {
          title: "Scaling & Modernization",
          sub: "Expanding and modernizing IT systems",
          desc: "We take over legacy code, clean up the architecture and prepare your system for the next order of magnitude in traffic and data.",
          points: ["Audit and refactoring", "Cloud migrations", "Performance and security"],
        },
        {
          title: "Data Science & GIS",
          sub: "Advanced data analytics and spatial systems",
          desc: "Data pipelines, decision dashboards and geospatial analysis — from acquisition all the way to the finished report.",
          points: ["Dashboards and predictive models", "GIS analysis and mapping", "Automated data acquisition"],
        },
      ],
    },
    industries: {
      eyebrow: "Industries",
      title1: "One engineering team, ",
      title2: "many B2B sectors",
      subtitle: "We work where processes are complex and data is scattered.",
      items: [
        { title: "Law & professional services", desc: "Case management systems, automated document analysis and due-diligence reporting." },
        { title: "Real estate & GIS", desc: "Parcel analysis, network layers, location scoring and decision-ready maps." },
        { title: "Logistics & e-commerce", desc: "Warehouse integrations, order automation and real-time operational panels." },
        { title: "Manufacturing & B2B enterprises", desc: "Shop-floor digitisation, KPI monitoring and ERP/MES integrations." },
      ],
    },
    about: {
      eyebrow: "About Us",
      title1: "An engineering team that ",
      title2: "measures return on investment",
      p1: "ZR EDGE is a team of engineers and analysts building custom software for B2B companies. We don't sell hours — we deliver systems that shorten processes and cut operating costs.",
      p2: "We work in short iterations: workshop, prototype, production rollout. Every stage ends with working software you can validate inside your own organisation.",
      cta: "Talk to the team",
      values: [
        { title: "ROI over feature lists", body: "Every module has a business case behind it: time saved, fewer errors or new revenue." },
        { title: "Security from day one", body: "Access control, encryption and GDPR compliance are built into the architecture, not bolted on at the end." },
        { title: "Scale without a rewrite", body: "We design the architecture so growth doesn't mean starting from scratch two years from now." },
      ],
    },
    blog: {
      eyebrow: "Knowledge base",
      title1: "News and ",
      title2: "engineering notes",
      subtitle: "Practical material on custom software, automation and data analytics.",
      readMore: "Read more",
      posts: [
        {
          date: "12 Aug 2026",
          tag: "Automation",
          title: "What a manual process really costs a B2B company",
          excerpt: "A simple model for pricing repetitive work — and the point where automation pays for itself in months.",
        },
        {
          date: "28 Jul 2026",
          tag: "Custom software",
          title: "Off-the-shelf or custom build? A short checklist",
          excerpt: "Seven questions worth asking before you sign another licence for a tool that almost fits.",
        },
        {
          date: "9 Jul 2026",
          tag: "Case study",
          title: "The operations panel that cut order handling by 68%",
          excerpt: "How integrating scattered spreadsheets with an ERP changed the daily work of a logistics team.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title1: "The questions we hear ",
      title2: "most often",
      items: [
        {
          q: "How long does custom software take to build?",
          a: "A working MVP is usually delivered 6–10 weeks after the kickoff workshop. Full production rollout depends on integration scope, but we work in two-week iterations, so you see results within the first couple of weeks.",
        },
        {
          q: "What technology stack do you use?",
          a: "Frontend: React and TypeScript. Backend: Node.js and Python. Databases: PostgreSQL with PostGIS for spatial data. Cloud infrastructure, CI/CD and monitoring are standard on every project.",
        },
        {
          q: "How do you handle data security?",
          a: "Encryption in transit and at rest, role- and record-level access control, full audit trails and GDPR compliance. We sign an NDA and a data processing agreement before work begins whenever required.",
        },
        {
          q: "Which processes are most commonly automated?",
          a: "Document routing and approvals, quote and report generation, data sync between CRM, ERP and spreadsheets, status notifications, and recurring data collection from external portals.",
        },
        {
          q: "Can you take over an existing legacy system?",
          a: "Yes. We start with a code and architecture audit, then propose a modernisation plan — from gradual refactoring to full migration without downtime for your business.",
        },
        {
          q: "What happens after launch?",
          a: "We provide maintenance, monitoring and ongoing development on a subscription model. You get full rights to the code and technical documentation — no vendor lock-in.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title1: "Describe the challenge. ",
      title2: "We'll send back a plan.",
      subtitle:
        "Tell us which process you want to improve or which system you want built. We reply within one business day with an initial scope and time estimate.",
      emailLabel: "Email",
      igLabel: "Instagram",
      form: {
        name: "Full name",
        namePh: "Jane Kowalski",
        email: "Email",
        emailPh: "you@company.com",
        industry: "Industry",
        industries: ["Law / professional services", "Real estate / GIS", "Logistics / e-commerce", "Manufacturing / industry", "Other industry"],
        message: "Message",
        messagePh: "Briefly describe the process or system you want to work on…",
        submit: "Send enquiry",
        sending: "Sending…",
        prefer: "Prefer email? Write to",
      },
      toastTitle: "Thanks for your message",
      toastDesc: "We'll get back to you within one business day.",
    },
    footer: {
      bio: "ZR EDGE designs and builds custom B2B software, automates operational processes and delivers advanced data analytics and GIS systems.",
      navHeading: "Navigation",
      legalHeading: "Information",
      nav: [
        { label: "Solutions", href: "#services" },
        { label: "For law firms", href: "#industries" },
        { label: "For companies", href: "#industries" },
        { label: "About us", href: "#about" },
        { label: "Contact", href: "#contact" },
        { label: "FAQ", href: "#faq" },
      ],
      legal: [
        { label: "Privacy policy", href: "#contact" },
        { label: "Cookies", href: "#contact" },
      ],
      rights: "© 2026 ZR EDGE. All rights reserved.",
      tagline: "Custom software and B2B automation",
    },
  },
} as const;

const SERVICE_ICONS = [Code2, Workflow, Layers, MapPinned];
const INDUSTRY_ICONS = [Scale, Building2, Truck, Factory];
const VALUE_ICONS = [Target, ShieldCheck, Rocket];

const EMAIL = "zr.edge@outlook.com";
const INSTAGRAM = "zr.edge";

/* ==================================================================
   Shared pieces
   ================================================================== */

/* LOGO — replace `zrLogo` import above with your own file to swap the mark. */
function ZrLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-2.5" aria-label="ZR EDGE">
      <img
        src={zrLogo}
        alt="ZR EDGE"
        className={`${compact ? "h-7" : "h-8"} w-auto brightness-0 invert`}
        loading="eager"
      />
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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
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

function SectionHeading({
  eyebrow,
  title1,
  title2,
  subtitle,
  accent = "blue",
}: {
  eyebrow: string;
  title1: string;
  title2: string;
  subtitle?: string;
  accent?: "blue" | "orange";
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span
        className={`inline-flex items-center rounded-full border border-zr-line bg-zr-surface px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
          accent === "blue" ? "text-zr-blue" : "text-zr-orange"
        }`}
      >
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-zr-text sm:text-4xl md:text-[2.6rem]">
        {title1}
        <span className="zr-gradient-text">{title2}</span>
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-zr-muted">{subtitle}</p>}
    </Reveal>
  );
}

/* ==================================================================
   Sections
   ================================================================== */

function Header({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const t = T[lang];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.industries, href: "#industries" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.blog, href: "#blog" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.contact, href: "#contact" },
  ];

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

  const LangSwitch = ({ full = false }: { full?: boolean }) => (
    <div
      className={`inline-flex items-center rounded-xl border border-zr-line bg-zr-surface p-0.5 ${full ? "w-full justify-center" : ""}`}
      role="group"
      aria-label="Language / Język"
    >
      {(["pl", "en"] as Lang[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-[10px] px-3 py-1.5 text-xs font-bold uppercase transition-all duration-200 ${
            lang === code ? "text-zr-text shadow-[var(--zr-glow-blue)]" : "text-zr-muted hover:text-zr-text"
          }`}
          style={lang === code ? { backgroundImage: "var(--zr-gradient)" } : undefined}
        >
          {code}
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-zr-line/80 bg-zr-bg/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <ZrLogo />

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-zr-muted transition-colors hover:text-zr-text">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LangSwitch />
          </div>
          <a
            href="#contact"
            className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-zr-text shadow-[var(--zr-glow-blue)] transition-transform duration-200 hover:scale-[1.03] lg:inline-flex"
            style={{ backgroundImage: "var(--zr-gradient)" }}
          >
            {t.headerCta}
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
        className={`fixed right-0 top-[72px] z-50 h-[calc(100dvh-72px)] w-[84%] max-w-sm overflow-y-auto border-l border-zr-line bg-zr-surface/95 px-6 py-8 backdrop-blur-xl transition-transform duration-300 ease-out xl:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-zr-muted transition-colors hover:bg-white/5 hover:text-zr-text"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-6 sm:hidden">
          <LangSwitch full />
        </div>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mt-4 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-zr-text"
          style={{ backgroundImage: "var(--zr-gradient)" }}
        >
          {t.headerCta}
        </a>
      </div>
    </header>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = T[lang].hero;

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
                {t.badge}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.1rem] font-extrabold leading-[1.08] tracking-tight text-zr-text sm:text-5xl lg:text-[3.4rem]">
                {t.title1}
                <br />
                <span className="zr-gradient-text">{t.title2}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zr-muted">{t.subtitle}</p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-zr-text shadow-[var(--zr-glow-blue)] transition-transform duration-200 hover:scale-[1.03]"
                  style={{ backgroundImage: "var(--zr-gradient)" }}
                >
                  {t.primary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-xl border border-zr-line bg-zr-surface px-6 py-3.5 text-sm font-semibold text-zr-text transition-colors hover:border-zr-blue/60 hover:bg-white/5"
                >
                  {t.secondary}
                </a>
              </div>
            </Reveal>

          </div>

          {/* Abstract 3D data-network visual */}
          <Reveal delay={200}>
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-[2rem] opacity-30 blur-3xl"
                style={{ backgroundImage: "var(--zr-gradient)" }}
                aria-hidden="true"
              />
              <div className="zr-glass relative overflow-hidden rounded-2xl p-2 shadow-2xl">
                <img
                  src={heroVisual}
                  alt={lang === "pl" ? "Abstrakcyjna wizualizacja sieci danych i siatki GIS" : "Abstract data network and GIS grid visualization"}
                  width={1280}
                  height={1280}
                  className="h-full w-full rounded-xl object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ background: "radial-gradient(120% 80% at 50% 110%, hsl(var(--zr-bg) / 0.85), transparent 60%)" }}
                  aria-hidden="true"
                />
              </div>
            </div>

          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services({ lang }: { lang: Lang }) {
  const t = T[lang].services;

  return (
    <section id="services" className="relative scroll-mt-20 border-t border-zr-line/70 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow} title1={t.title1} title2={t.title2} subtitle={t.subtitle} />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {t.items.map((s, i) => {
            const Icon = SERVICE_ICONS[i];
            const isBlue = i % 2 === 0;
            return (
              <Reveal key={s.title} delay={i * 90}>
                <article className="zr-glass group h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                      isBlue ? "bg-zr-blue/15 text-zr-blue" : "bg-zr-orange/15 text-zr-orange"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-zr-text">{s.title}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-zr-muted/80">{s.sub}</p>
                  <p className="mt-3 text-sm leading-relaxed text-zr-muted">{s.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-zr-muted">
                        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isBlue ? "bg-zr-blue" : "bg-zr-orange"}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Industries({ lang }: { lang: Lang }) {
  const t = T[lang].industries;

  return (
    <section id="industries" className="relative scroll-mt-20 border-t border-zr-line/70 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow} title1={t.title1} title2={t.title2} subtitle={t.subtitle} accent="orange" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {t.items.map((item, i) => {
            const Icon = INDUSTRY_ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 90}>
                <div className="zr-glass flex h-full items-start gap-5 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-zr-blue">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zr-text">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zr-muted">{item.desc}</p>
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

function About({ lang }: { lang: Lang }) {
  const t = T[lang].about;

  return (
    <section id="about" className="relative scroll-mt-20 border-t border-zr-line/70 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-zr-line bg-zr-surface px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zr-orange">
              {t.eyebrow}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-zr-text sm:text-4xl">
              {t.title1}
              <span className="zr-gradient-text">{t.title2}</span>
            </h2>
            {/* PLACEHOLDER: company story */}
            <p className="mt-5 text-base leading-relaxed text-zr-muted">{t.p1}</p>
            <p className="mt-4 text-base leading-relaxed text-zr-muted">{t.p2}</p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl border border-zr-line bg-zr-surface px-5 py-3 text-sm font-semibold text-zr-text transition-colors hover:border-zr-orange/60 hover:bg-white/5"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <div className="grid gap-4">
            {t.values.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <Reveal key={v.title} delay={i * 110}>
                  <div className="zr-glass flex gap-4 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-zr-blue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zr-text">{v.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zr-muted">{v.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Blog({ lang }: { lang: Lang }) {
  const t = T[lang].blog;

  return (
    <section id="blog" className="relative scroll-mt-20 border-t border-zr-line/70 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow} title1={t.title1} title2={t.title2} subtitle={t.subtitle} />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 100}>
              <article className="zr-glass group h-full overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20">
                {/* PLACEHOLDER: replace with <img src="..." alt="..." loading="lazy" className="h-44 w-full object-cover" /> */}
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
                    {t.readMore}
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

function Faq({ lang }: { lang: Lang }) {
  const t = T[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-20 border-t border-zr-line/70 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <SectionHeading eyebrow={t.eyebrow} title1={t.title1} title2={t.title2} />

        <div className="mt-14 space-y-3">
          {t.items.map((item, i) => {
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
                  <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
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

function Contact({ lang }: { lang: Lang }) {
  const t = T[lang].contact;
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    window.setTimeout(() => {
      setSending(false);
      form.reset();
      toast({ title: t.toastTitle, description: t.toastDesc });
    }, 700);
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zr-text placeholder:text-zr-muted/70 outline-none transition-colors focus:border-zr-blue/70 focus:bg-white/[0.06]";
  const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-wide text-zr-muted";

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
              {t.eyebrow}
            </span>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-zr-text sm:text-4xl">
              {t.title1}
              <span className="zr-gradient-text">{t.title2}</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zr-muted">{t.subtitle}</p>

            <div className="mt-9 space-y-3">
              <a
                href={`mailto:${EMAIL}`}
                className="zr-glass flex items-center gap-4 rounded-2xl px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zr-blue/15 text-zr-blue">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-zr-muted">{t.emailLabel}</span>
                  <span className="block text-sm font-semibold text-zr-text">{EMAIL}</span>
                </span>
              </a>
              <a
                href={`https://instagram.com/${INSTAGRAM}`}
                target="_blank"
                rel="noopener noreferrer"
                className="zr-glass flex items-center gap-4 rounded-2xl px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zr-orange/15 text-zr-orange">
                  <Instagram className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-zr-muted">{t.igLabel}</span>
                  <span className="block text-sm font-semibold text-zr-text">@{INSTAGRAM}</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={handleSubmit} className="zr-glass rounded-2xl p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="zr-name" className={labelClass}>
                    {t.form.name}
                  </label>
                  <input id="zr-name" name="name" required placeholder={t.form.namePh} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="zr-email" className={labelClass}>
                    {t.form.email}
                  </label>
                  <input id="zr-email" name="email" type="email" required placeholder={t.form.emailPh} className={inputClass} />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="zr-industry" className={labelClass}>
                  {t.form.industry}
                </label>
                <select id="zr-industry" name="industry" className={inputClass} defaultValue={t.form.industries[0]}>
                  {t.form.industries.map((opt) => (
                    <option key={opt} value={opt} className="bg-zr-surface">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="zr-message" className={labelClass}>
                  {t.form.message}
                </label>
                <textarea
                  id="zr-message"
                  name="message"
                  rows={4}
                  required
                  placeholder={t.form.messagePh}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-zr-text shadow-[var(--zr-glow-blue)] transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
                style={{ backgroundImage: "var(--zr-gradient)" }}
              >
                {sending ? t.form.sending : t.form.submit}
                {!sending && <ArrowRight className="h-4 w-4" />}
              </button>
              <p className="mt-3 text-center text-xs text-zr-muted">
                {t.form.prefer}{" "}
                <a href={`mailto:${EMAIL}`} className="text-zr-blue hover:underline">
                  {EMAIL}
                </a>
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const t = T[lang].footer;

  return (
    <footer className="border-t border-zr-line/70 bg-zr-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <ZrLogo compact />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zr-muted">{t.bio}</p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email ZR EDGE"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zr-line text-zr-muted transition-colors hover:border-zr-blue/60 hover:text-zr-text"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={`https://instagram.com/${INSTAGRAM}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ZR EDGE on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zr-line text-zr-muted transition-colors hover:border-zr-orange/60 hover:text-zr-text"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-zr-text">{t.navHeading}</h3>
            <ul className="mt-4 space-y-2.5">
              {t.nav.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-zr-muted transition-colors hover:text-zr-text">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-zr-text">{t.legalHeading}</h3>
            <ul className="mt-4 space-y-2.5">
              {t.legal.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-zr-muted transition-colors hover:text-zr-text">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-zr-line/70 pt-6 sm:flex-row">
          <p className="text-xs text-zr-muted">{t.rights}</p>
          <p className="text-xs text-zr-muted">{t.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */

export default function ZrEdgeLanding() {
  const [lang, setLang] = useState<Lang>("pl"); // default language: Polish

  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = previous;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="zr-theme min-h-screen antialiased">
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Services lang={lang} />
        <Industries lang={lang} />
        <About lang={lang} />
        <Blog lang={lang} />
        <Faq lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
