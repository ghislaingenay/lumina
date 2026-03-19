import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const vogun = localFont({
  src: [
    { path: "./fonts/vogun-medium.woff", weight: "500", style: "normal" },
    { path: "./fonts/vogun-mediumItalic.woff", weight: "500", style: "italic" },
  ],
  variable: "--font-vogun",
  display: "block",
});

export const metadata: Metadata = {
  title: "Lumina — Handcrafted Wood Lamps",
  description:
    "Discover Lumina's collection of handcrafted wood lamps. Where timeless elegance meets modern illumination. Customize your unique lamp online.",
  metadataBase: new URL("https://lumina.redicreate.com"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Lumina — Handcrafted Wood Lamps",
    description:
      "Discover Lumina's collection of handcrafted wood lamps. Where timeless elegance meets modern illumination.",
    url: "https://lumina.com",
    siteName: "Lumina",
    images: [
      {
        url: "/landing.jpg",
        width: 1200,
        height: 630,
        alt: "Lumina Wood Lamps",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina — Handcrafted Wood Lamps",
    description:
      "Discover Lumina's collection of handcrafted wood lamps. Where timeless elegance meets modern illumination.",
    images: ["/landing.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={vogun.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
