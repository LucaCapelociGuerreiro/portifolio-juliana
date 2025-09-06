import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./simple.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/seo/structured-data";
import { SITE_CONFIG } from "@/lib/constants";
import { getOrganizationStructuredData, getPersonStructuredData } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.author,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: "@analista_seo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="stylesheet" href="/emergency-styles.css" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Estilos críticos elegantes para carregamento */
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              background: linear-gradient(135deg, hsl(240, 10%, 3.9%) 0%, hsl(240, 15%, 5%) 100%) !important;
              color: hsl(0, 0%, 98%) !important;
              line-height: 1.6;
              min-height: 100vh;
            }
            header { 
              position: sticky; 
              top: 0; 
              background-color: hsla(240, 10%, 6%, 0.85) !important; 
              border-bottom: 1px solid hsl(271, 81%, 56%, 0.2) !important;
              backdrop-filter: blur(20px);
              box-shadow: 0 4px 32px hsla(271, 81%, 56%, 0.1);
              z-index: 50;
            }
            .container { 
              max-width: 1200px; 
              margin: 0 auto; 
              padding: 0 1rem; 
            }
            .btn { 
              display: inline-flex; 
              align-items: center; 
              padding: 0.75rem 1.5rem; 
              border-radius: 0.75rem; 
              text-decoration: none; 
              font-weight: 500;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .btn-primary { 
              background: linear-gradient(135deg, hsl(271, 81%, 56%) 0%, hsl(262, 83%, 58%) 100%) !important; 
              color: hsl(0, 0%, 98%) !important; 
              box-shadow: 0 0 20px hsla(271, 81%, 56%, 0.3);
            }
            .btn-primary:hover { 
              transform: translateY(-2px);
              box-shadow: 0 0 40px hsla(271, 81%, 56%, 0.4);
            }
            .hero {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: radial-gradient(ellipse at center, hsla(271, 81%, 56%, 0.15) 0%, transparent 70%);
            }
            .hero h1 {
              font-size: 2.25rem;
              font-weight: bold;
              margin-bottom: 1.5rem;
              text-align: center;
              background: linear-gradient(135deg, hsl(271, 81%, 56%) 0%, hsl(262, 83%, 58%) 50%, hsl(252, 56%, 57%) 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          `
        }} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <StructuredData data={getOrganizationStructuredData()} id="organization" />
        <StructuredData data={getPersonStructuredData()} id="person" />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
