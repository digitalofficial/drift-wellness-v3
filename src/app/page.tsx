"use client";

import { useEffect, useRef } from "react";
import Logo from "@/components/Logo";
import {
  SyringeIcon,
  DropletsIcon,
  SparklesIcon,
  DotIcon,
  ZapIcon,
  HeartIcon,
  TargetIcon,
  PillIcon,
  ShieldCheckIcon,
  CpuIcon,
  UserCheckIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  QuoteIcon,
  StarIcon,
  CheckIcon,
} from "@/components/Icons";

/* =============================================
   Scroll Reveal Hook
   ============================================= */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    const children = el.querySelectorAll(".reveal");
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* =============================================
   NAV
   ============================================= */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="glass-card flex items-center justify-between px-6 py-3 rounded-2xl">
          <Logo className="h-10 w-auto" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-muted hover:text-primary transition-colors">
              Services
            </a>
            <a href="#about" className="text-sm text-muted hover:text-primary transition-colors">
              Why Drift
            </a>
            <a href="#spotlight" className="text-sm text-muted hover:text-primary transition-colors">
              Spotlight
            </a>
            <a href="#booking" className="text-sm text-muted hover:text-primary transition-colors">
              Contact
            </a>
          </div>
          <a href="#booking" className="btn-primary !py-2.5 !px-6 text-sm">
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}

/* =============================================
   HERO
   ============================================= */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Floating glass orbs */}
      <div className="hero-glass-orb w-72 h-72 top-[15%] left-[8%] animate-float" aria-hidden="true" />
      <div className="hero-glass-orb w-48 h-48 top-[60%] right-[12%] animate-float-delayed" aria-hidden="true" style={{ animationDelay: "2s" }} />
      <div className="hero-glass-orb w-32 h-32 bottom-[20%] left-[25%] animate-float" aria-hidden="true" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="glass-badge">Now offering IV therapy</span>
        </div>

        {/* Heading */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
          Elevate{" "}
          <span className="shiny-text">your glow.</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Tucson&apos;s premier med spa blending cutting-edge aesthetics with holistic wellness.
          Science-backed treatments, serene results.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#booking" className="btn-primary text-base">
            Book a Treatment
            <ArrowRightIcon />
          </a>
          <a href="#services" className="btn-secondary text-base">
            Explore Services
          </a>
        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 py-4 marquee-container">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              {[
                "Botox & Fillers",
                "IV Therapy",
                "Chemical Peels",
                "Microneedling",
                "Laser Hair Removal",
                "Facials",
                "Body Contouring",
                "Vitamin Injections",
              ].map((service) => (
                <span key={service} className="text-sm text-muted/50 whitespace-nowrap flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-primary/40" />
                  {service}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================
   SERVICES BENTO
   ============================================= */
const services = [
  { name: "Botox & Fillers", desc: "Smooth lines, restore volume, and refine your natural contours with precision injectables administered by our board-certified team.", icon: <SyringeIcon />, large: true },
  { name: "IV Therapy & Hydration", desc: "Custom vitamin drip blends to boost energy, immunity, and radiance from the inside out.", icon: <DropletsIcon />, large: false },
  { name: "Chemical Peels", desc: "Medical-grade peels that reveal brighter, smoother skin with minimal downtime.", icon: <SparklesIcon />, large: false },
  { name: "Microneedling", desc: "Collagen-induction therapy for tighter pores, reduced scarring, and renewed texture.", icon: <DotIcon />, large: false },
  { name: "Laser Hair Removal", desc: "Permanent reduction with the latest laser technology. Safe for all skin types.", icon: <ZapIcon />, large: false },
  { name: "Facials & Skin Care", desc: "Luxury medical facials combining clinical actives with deeply relaxing techniques.", icon: <HeartIcon />, large: false },
  { name: "Body Contouring", desc: "Non-invasive body sculpting to tone and tighten, targeting stubborn areas with precision.", icon: <TargetIcon />, large: false },
  { name: "Vitamin Injections", desc: "Targeted B12, biotin, and glutathione shots for a quick wellness boost.", icon: <PillIcon />, large: false },
];

function Services() {
  const ref = useReveal();
  return (
    <section id="services" className="section-spacing" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3 font-display">Our Services</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Treatments tailored to <span className="shiny-text">you</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            From subtle enhancements to full rejuvenation, our menu is designed for every stage of your wellness journey.
          </p>
        </div>

        <div className="bento-grid">
          {services.map((s, i) => (
            <div
              key={s.name}
              className={`reveal glass-card p-8 flex flex-col justify-between ${s.large ? "bento-large glow-border" : ""}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div>
                <div className="glass-icon mb-5">{s.icon}</div>
                <h3 className="font-display text-xl font-semibold mb-3 text-text">{s.name}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-6">
                <a href="#booking" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all">
                  Learn more <ArrowRightIcon />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================
   WHY DRIFT
   ============================================= */
const reasons = [
  { title: "Board Certified", desc: "Our medical staff holds the highest credentials, ensuring safe and expert care for every treatment.", icon: <ShieldCheckIcon /> },
  { title: "Cutting Edge", desc: "We invest in the latest technology and techniques so you always receive state-of-the-art results.", icon: <CpuIcon /> },
  { title: "Custom Plans", desc: "No cookie-cutter treatments. Every protocol is personalized to your skin, goals, and lifestyle.", icon: <UserCheckIcon /> },
  { title: "Results Driven", desc: "We track your progress with before-and-after imaging and measurable outcome benchmarks.", icon: <TrendingUpIcon /> },
];

function WhyDrift() {
  const ref = useReveal();
  return (
    <section id="about" className="section-spacing" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3 font-display">Why Drift</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            A different kind of <span className="shiny-text">med spa</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            We combine clinical precision with a calming, luxury experience you will not find anywhere else in Tucson.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="reveal glass-card p-8 text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="glass-icon mx-auto mb-5">{r.icon}</div>
              <h3 className="font-display text-lg font-semibold mb-2">{r.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================
   TREATMENT SPOTLIGHT
   ============================================= */
function Spotlight() {
  const ref = useReveal();
  return (
    <section id="spotlight" className="section-spacing" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal glass-card glow-border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image placeholder */}
            <div className="relative min-h-[320px] lg:min-h-[480px] bg-gradient-to-br from-primary/10 via-surface to-secondary/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon />
                </div>
                <p className="text-muted text-sm">Treatment imagery</p>
              </div>
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/60 lg:block hidden" />
            </div>

            {/* Content */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <span className="glass-badge mb-6 self-start">Most Popular</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                The Drift <span className="shiny-text">Glow Protocol</span>
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Our signature three-step treatment combining a medical-grade facial, a customized chemical peel,
                and LED light therapy for maximum radiance. Results are visible after a single session,
                with cumulative benefits over a treatment series.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Deep-cleansing medical facial",
                  "Customized chemical peel (glycolic / lactic / salicylic)",
                  "LED red light therapy for collagen stimulation",
                  "Hydrating mask & SPF finish",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text/80">
                    <span className="mt-0.5"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#booking" className="btn-primary self-start">
                Book the Glow Protocol
                <ArrowRightIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================
   TESTIMONIAL
   ============================================= */
function Testimonial() {
  const ref = useReveal();
  return (
    <section className="section-spacing" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="reveal glass-card p-10 sm:p-14 text-center relative">
          <div className="absolute top-8 left-10">
            <QuoteIcon />
          </div>
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <blockquote className="font-display text-xl sm:text-2xl font-medium leading-relaxed mb-6 max-w-2xl mx-auto">
            &ldquo;Drift Wellness completely transformed how I feel about my skin. The team is incredibly
            knowledgeable, the space is gorgeous, and I walked out after my first Glow Protocol feeling
            like a completely new person. My confidence is through the roof.&rdquo;
          </blockquote>
          <div>
            <p className="font-display font-semibold text-text">Mariana R.</p>
            <p className="text-muted text-sm">Tucson, AZ</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================
   CONSULTATION INFO
   ============================================= */
function ConsultationInfo() {
  const ref = useReveal();
  return (
    <section className="section-spacing" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal glass-card p-10 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                Free
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight mb-3">
                Complimentary Consultation
              </h2>
              <p className="text-muted leading-relaxed">
                Every journey at Drift begins with a one-on-one consultation. We take time to understand
                your goals before recommending any treatment.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg mb-4">What to Expect</h3>
              <ul className="space-y-3">
                {[
                  "Skin analysis with advanced imaging",
                  "Personalized treatment plan",
                  "Transparent pricing breakdown",
                  "No pressure, no obligation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5"><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg mb-4">Financing Available</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                We partner with CareCredit and Cherry to offer flexible payment plans. Invest in yourself
                on a timeline that works for your budget.
              </p>
              <p className="text-muted text-sm leading-relaxed">
                Ask about our membership program for recurring treatments at preferred pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================
   BOOKING FORM
   ============================================= */
function BookingForm() {
  const ref = useReveal();
  return (
    <section id="booking" className="section-spacing" ref={ref}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3 font-display">Get Started</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Book your <span className="shiny-text">appointment</span>
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            Fill out the form below and our team will reach out within 24 hours to confirm your booking.
          </p>
        </div>

        <div className="reveal glass-card p-8 sm:p-12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you! We will be in touch shortly to confirm your appointment.");
            }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text/80 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Jane Doe"
                  className="glass-input"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="jane@email.com"
                  className="glass-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text/80 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="(520) 555-0000"
                  className="glass-input"
                />
              </div>
              <div>
                <label htmlFor="treatment" className="block text-sm font-medium text-text/80 mb-2">
                  Treatment Interest
                </label>
                <select id="treatment" name="treatment" required className="glass-input">
                  <option value="">Select a treatment</option>
                  <option value="botox-fillers">Botox & Fillers</option>
                  <option value="iv-therapy">IV Therapy & Hydration</option>
                  <option value="chemical-peels">Chemical Peels</option>
                  <option value="microneedling">Microneedling</option>
                  <option value="laser-hair-removal">Laser Hair Removal</option>
                  <option value="facials">Facials & Skin Care</option>
                  <option value="body-contouring">Body Contouring</option>
                  <option value="vitamin-injections">Vitamin Injections</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-text/80 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="glass-input"
              />
            </div>

            <div>
              <label htmlFor="concerns" className="block text-sm font-medium text-text/80 mb-2">
                Concerns / Goals
              </label>
              <textarea
                id="concerns"
                name="concerns"
                rows={4}
                placeholder="Tell us about your skin goals, concerns, or any questions you have..."
                className="glass-input resize-none"
              />
            </div>

            <button type="submit" className="btn-primary w-full text-base !py-4 mt-2">
              Request Appointment
              <ArrowRightIcon />
            </button>

            <p className="text-center text-muted text-xs mt-4">
              By submitting, you agree to our privacy policy. We will never share your information.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* =============================================
   FOOTER
   ============================================= */
function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="glass-card p-10 sm:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Logo & about */}
            <div className="lg:col-span-1">
              <Logo className="h-10 w-auto mb-5" />
              <p className="text-muted text-sm leading-relaxed">
                Tucson&apos;s premier destination for aesthetic treatments and holistic wellness.
                Where science meets serenity.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-muted">
                  <PhoneIcon /> (520) 555-0188
                </li>
                <li className="flex items-center gap-3 text-sm text-muted">
                  <MailIcon /> hello@driftwellness.com
                </li>
                <li className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5"><MapPinIcon /></span>
                  4801 E Sunrise Dr, Suite 120<br />Tucson, AZ 85718
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-display font-semibold mb-4">Hours</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-sm text-muted">
                  <ClockIcon />
                  <span>
                    <strong className="text-text/80">Mon - Fri:</strong> 9:00 AM - 6:00 PM
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted">
                  <ClockIcon />
                  <span>
                    <strong className="text-text/80">Saturday:</strong> 9:00 AM - 3:00 PM
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted">
                  <ClockIcon />
                  <span>
                    <strong className="text-text/80">Sunday:</strong> Closed
                  </span>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="font-display font-semibold mb-4">Follow Us</h4>
              <div className="flex items-center gap-3">
                {[
                  { icon: <InstagramIcon />, label: "Instagram", href: "https://instagram.com/driftwellness" },
                  { icon: <FacebookIcon />, label: "Facebook", href: "https://facebook.com/driftwellness" },
                  { icon: <TikTokIcon />, label: "TikTok", href: "https://tiktok.com/@driftwellness" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-icon !w-11 !h-11 !rounded-xl text-muted hover:text-primary transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <p className="text-muted text-xs mt-6 leading-relaxed">
                Follow us for treatment tips, before &amp; after results, and exclusive offers.
              </p>
            </div>
          </div>

          {/* Medical disclaimer */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <p className="text-muted/60 text-xs leading-relaxed text-center max-w-3xl mx-auto">
              <strong className="text-muted/80">Medical Disclaimer:</strong> The information provided on this website is for
              general informational purposes only and does not constitute medical advice. All treatments are performed by
              licensed medical professionals. Individual results may vary. A consultation is required before any procedure.
              Drift Wellness is not responsible for any adverse reactions or outcomes. Please consult with a qualified
              healthcare provider for personalized medical advice.
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center">
            <p className="text-muted/40 text-xs">
              &copy; {new Date().getFullYear()} Drift Wellness. All rights reserved. Tucson, AZ.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =============================================
   PAGE
   ============================================= */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <WhyDrift />
      <Spotlight />
      <Testimonial />
      <ConsultationInfo />
      <BookingForm />
      <Footer />
    </main>
  );
}
