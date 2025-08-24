import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from './context/LanguageContext'; // se o arquivo estiver em app/context

// Configuração do Inter com fallbacks robustos
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Melhora performance e evita FOIT
  fallback: [
    'system-ui',
    '-apple-system', 
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'sans-serif'
  ],
  adjustFontFallback: true, // Ajusta métricas dos fallbacks
  preload: true,
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Juliana Kaiza Rodrigues do Nascimento | Portfolio',
  description: 'Portfólio de Analista de SEO.',
  keywords: ['SEO', 'Analista de SEO', 'Otimização de Sites', 'Link Building', 'Core Web Vitals', 'Next.js', 'React'],
  authors: [{ name: 'Juliana Kaiza Rodrigues do Nascimento' }],
  creator: 'Juliana Kaiza Rodrigues do Nascimento',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/profile.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://portfolio.example.com/juliana',
    title: 'Juliana Kaiza Rodrigues do Nascimento | Portfolio',
    description: 'Portfólio de Analista de SEO.',
    siteName: 'Juliana Portfolio',
    images: ['/images/profile.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juliana Kaiza Rodrigues do Nascimento | Portfolio',
    description: 'Portfólio de Analista de SEO.',
    images: ['/images/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preconnect para Google Fonts com fallback */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch como fallback adicional */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      {/* Aplicando classes base do tema */}
      <body className={`${inter.className} ${inter.variable} bg-section-primary text-gray-900 dark:text-white`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
