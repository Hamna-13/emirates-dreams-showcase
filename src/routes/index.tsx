import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Sparkles,
  ShieldCheck,
  Crown,
  Building2,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import heroDubai from "@/assets/hero-dubai.jpg";
import propVilla from "@/assets/property-villa.jpg";
import propPenthouse from "@/assets/property-penthouse.jpg";
import propMansion from "@/assets/property-mansion.jpg";
import { ChatWidget } from "@/components/ChatWidget";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Emirates Royale — Luxury Real Estate in the UAE" },
      {
        name: "description",
        content:
          "Discover the UAE's most prestigious villas, penthouses and off-plan investments across Dubai, Abu Dhabi and beyond. Concierge-led property advisory since 2008.",
      },
      { property: "og:title", content: "Emirates Royale — Luxury Real Estate in the UAE" },
      {
        property: "og:description",
        content: "Curated palaces, penthouses and beachfront estates across the Emirates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const listings = [
  {
    img: propVilla,
    tag: "Signature Villa",
    title: "Emerald Pavilion Villa",
    location: "Emirates Hills, Dubai",
    price: "AED 62,000,000",
    beds: 7,
    baths: 9,
    area: "22,400 sqft",
  },
  {
    img: propPenthouse,
    tag: "Sky Residence",
    title: "The Marina Crown Penthouse",
    location: "Dubai Marina",
    price: "AED 34,500,000",
    beds: 5,
    baths: 6,
    area: "9,850 sqft",
  },
  {
    img: propMansion,
    tag: "Beachfront Estate",
    title: "Palm Sovereign Mansion",
    location: "Palm Jumeirah, Frond G",
    price: "AED 145,000,000",
    beds: 9,
    baths: 12,
    area: "38,200 sqft",
  },
];

function Home() {
  const [openChat, setOpenChat] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="absolute top-0 left-0 right-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="#" className="flex items-center gap-2 text-primary-foreground">
            <Crown className="h-6 w-6 text-gold" />
            <span className="font-display text-2xl tracking-wide">Emirates Royale</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-primary-foreground/90 md:flex">
            <a href="#listings" className="hover:text-gold">Properties</a>
            <a href="#areas" className="hover:text-gold">Areas</a>
            <a href="#services" className="hover:text-gold">Services</a>
            <a href="#contact" className="hover:text-gold">Contact</a>
          </nav>
          <a
            href="#contact"
            className="hidden rounded-full border border-gold/60 px-5 py-2 text-sm text-gold hover:bg-gold hover:text-primary md:inline-block"
          >
            +971 4 000 0000
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src={heroDubai}
          alt="Dubai skyline at golden hour"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20">
          <div className="max-w-3xl text-primary-foreground">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/30 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Since 2008 · Dubai · Abu Dhabi
            </span>
            <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">
              The Emirates',
              <br />
              <span className="text-gradient-gold italic">most extraordinary</span>
              <br />
              addresses.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
              A private property house curating palaces on Palm Jumeirah, sky-touching penthouses in
              Downtown Dubai and generational estates across the seven Emirates.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#listings"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-primary shadow-gold transition hover:brightness-110"
              >
                Explore residences <ArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={() => setOpenChat((n) => n + 1)}
                className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-white/5 px-7 py-3.5 text-sm text-gold backdrop-blur transition hover:bg-gold hover:text-primary"
              >
                <Sparkles className="h-4 w-4" /> Chat with Amira, AI Concierge
              </button>
            </div>
            <div className="mt-14 grid max-w-2xl grid-cols-3 gap-8 border-t border-white/15 pt-8">
              {[
                ["AED 4.8B+", "Sold in 2024"],
                ["1,200+", "Curated listings"],
                ["17 yrs", "Serving royalty"],
              ].map(([v, l]) => (
                <div key={l as string}>
                  <div className="font-display text-3xl text-gold">{v}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-primary-foreground/70">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold">The Collection</div>
            <h2 className="font-display text-4xl md:text-5xl">Featured Residences</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Hand-selected homes representing the very finest addresses across the United Arab Emirates.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-2xl bg-card ring-1 ring-border transition hover:ring-gold/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-widest text-gold backdrop-blur">
                  {p.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {p.location}
                </div>
                <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                <div className="mt-3 text-lg font-medium text-gradient-gold">{p.price}</div>
                <div className="mt-5 flex items-center gap-5 border-t border-border pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-gold" />{p.beds} Beds</span>
                  <span className="inline-flex items-center gap-1.5"><Bath className="h-4 w-4 text-gold" />{p.baths} Baths</span>
                  <span className="inline-flex items-center gap-1.5"><Ruler className="h-4 w-4 text-gold" />{p.area}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Areas */}
      <section id="areas" className="bg-royal py-24 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-2xl">
            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold">Prestige Neighborhoods</div>
            <h2 className="font-display text-4xl md:text-5xl">Where the Emirates live grandly.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Palm Jumeirah", "Iconic beachfront fronds"],
              ["Downtown Dubai", "Views of Burj Khalifa"],
              ["Emirates Hills", "The Beverly Hills of Dubai"],
              ["Saadiyat Island", "Abu Dhabi's cultural coast"],
            ].map(([n, d]) => (
              <div key={n} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-gold/50">
                <Building2 className="h-6 w-6 text-gold" />
                <div className="mt-4 font-display text-2xl">{n}</div>
                <div className="mt-1 text-sm text-primary-foreground/70">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold">Our House</div>
            <h2 className="font-display text-4xl md:text-5xl">Concierge property advisory, tailored to your legacy.</h2>
            <p className="mt-6 text-muted-foreground">
              From private acquisitions to Golden Visa structuring and yield-focused off-plan investments,
              our advisors guide you with the discretion your family deserves.
            </p>
            <div className="mt-8 space-y-4">
              {[
                ["Golden Visa Advisory", "Structured for AED 2M+ property investors."],
                ["Off-Plan Investment", "Curated launches with 8–12% projected ROI."],
                ["Private Sales", "Off-market access to trophy assets."],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-4 rounded-xl border border-border p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-medium">{t}</div>
                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={propPenthouse}
              alt="Luxury interior"
              loading="lazy"
              width={1200}
              height={900}
              className="rounded-2xl shadow-luxe"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-royal p-6 text-primary-foreground shadow-luxe md:block">
              <Crown className="h-6 w-6 text-gold" />
              <div className="mt-3 font-display text-2xl">RERA Certified</div>
              <div className="text-xs uppercase tracking-widest text-primary-foreground/70">Dubai Land Department</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-royal py-24 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold">Begin the conversation</div>
          <h2 className="font-display text-4xl md:text-5xl">Your next address awaits.</h2>
          <p className="mx-auto mt-5 max-w-xl text-primary-foreground/75">
            Speak with a private advisor, or let our AI concierge Amira help you narrow the search in seconds.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="tel:+97140000000" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-primary hover:brightness-110">
              <Phone className="h-4 w-4" /> +971 4 000 0000
            </a>
            <a href="mailto:hello@emiratesroyale.ae" className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-7 py-3.5 text-sm text-gold hover:bg-gold hover:text-primary">
              <Mail className="h-4 w-4" /> hello@emiratesroyale.ae
            </a>
            <button
              onClick={() => setOpenChat((n) => n + 1)}
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-7 py-3.5 text-sm text-gold hover:bg-gold hover:text-primary"
            >
              <Sparkles className="h-4 w-4" /> Chat with Amira
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-gold" />
            <span className="font-display text-lg text-foreground">Emirates Royale</span>
          </div>
          <div>© {new Date().getFullYear()} Emirates Royale Real Estate LLC · ORN 00000</div>
        </div>
      </footer>

      <ChatWidget openSignal={openChat} />
    </div>
  );
}
