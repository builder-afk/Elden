import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { WishlistProvider } from "@/components/wishlist/WishlistProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { storeInfo } from "@/data/store";


export const metadata: Metadata = {
  title: "Lata Jewellers (लता ज्वैलर्स) | Luxury Jewellery in Govind Nagar, Kanpur",
  description:
    "Discover timeless Indian jewellery, 22K hallmarked gold, uncut Polki diamonds, and bridal jewellery at Lata Jewellers in Vidyarthi Market, Govind Nagar, Kanpur.",
  keywords: [
    "Lata Jewellers",
    "लता ज्वैलर्स",
    "Jewellery Store Kanpur",
    "Govind Nagar Jewellers",
    "Bridal Jewellery Kanpur",
    "22K Gold Jewellery",
    "Kundan Necklace",
    "Diamond Rings Kanpur",
    "Temple Jewellery",
  ],
  openGraph: {
    title: "Lata Jewellers | Jewellery for Generations",
    description:
      "Handcrafted 22K gold, polki, and bridal jewellery at Govind Nagar, Kanpur. 4.9★ rating with 127+ verified reviews.",
    type: "website",
    locale: "en_IN",
    siteName: "Lata Jewellers",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Noto+Sans+Devanagari:wght@100..900&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JewelryStore",
              name: "Lata Jewellers",
              alternateName: "लता ज्वैलर्स",
              image: "/images/hero/bridal-hero.jpg",
              telephone: storeInfo.phone || "+91-512-XXXXXXX",
              address: {
                "@type": "PostalAddress",
                streetAddress: storeInfo.address.line1,
                addressLocality: storeInfo.address.area,
                addressRegion: storeInfo.address.state,
                postalCode: storeInfo.address.pincode,
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: storeInfo.coordinates.lat,
                longitude: storeInfo.coordinates.lng,
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: storeInfo.googleRating.toString(),
                reviewCount: storeInfo.googleReviews.toString(),
              },
              priceRange: "₹₹₹",
              openingHours: "Mo-Su 10:00-21:00",
            }),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-[#FFFEF7] text-[#3C2415]">
        <AuthProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <MobileNav />
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
