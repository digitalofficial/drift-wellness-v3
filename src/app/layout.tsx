import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Drift Wellness | Med Spa & Wellness in Tucson, AZ",
  description:
    "Drift Wellness is a premier med spa and wellness center in Tucson, AZ offering Botox, fillers, IV therapy, chemical peels, microneedling, laser hair removal, facials, body contouring, and vitamin injections. Elevate your glow.",
  keywords: [
    "med spa Tucson",
    "wellness center Tucson AZ",
    "Botox Tucson",
    "IV therapy Tucson",
    "chemical peels",
    "microneedling",
    "laser hair removal",
    "facials",
    "body contouring",
    "vitamin injections",
    "Drift Wellness",
  ],
  openGraph: {
    title: "Drift Wellness | Med Spa & Wellness in Tucson, AZ",
    description:
      "Premier med spa and wellness center in Tucson. Botox, IV therapy, chemical peels, microneedling, and more. Elevate your glow.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalSpa",
    name: "Drift Wellness",
    description:
      "Premier med spa and wellness center in Tucson, AZ offering Botox, fillers, IV therapy, chemical peels, microneedling, laser hair removal, facials, body contouring, and vitamin injections.",
    url: "https://driftwellness.com",
    telephone: "(520) 555-0188",
    address: {
      "@type": "PostalAddress",
      streetAddress: "4801 E Sunrise Dr, Suite 120",
      addressLocality: "Tucson",
      addressRegion: "AZ",
      postalCode: "85718",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "32.2960",
      longitude: "-110.8856",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "15:00",
      },
    ],
    priceRange: "$$",
    image: "https://driftwellness.com/og-image.jpg",
    sameAs: [
      "https://instagram.com/driftwellness",
      "https://facebook.com/driftwellness",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Med Spa Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Botox & Fillers" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "IV Therapy & Hydration" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chemical Peels" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Microneedling" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laser Hair Removal" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facials & Skin Care" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Body Contouring" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vitamin Injections" } },
      ],
    },
  };

  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-base text-text font-body antialiased">
        {/* Mesh Gradient Background */}
        <div className="mesh-bg" aria-hidden="true">
          <div className="mesh-orb mesh-orb--teal" />
          <div className="mesh-orb mesh-orb--violet" />
          <div className="mesh-orb mesh-orb--warm" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
