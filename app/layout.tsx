import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const hankenGrotesk = Hanken_Grotesk({
  variable: '--font-hanken-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const BASE_URL = 'https://mikaelsonschoolclub.org';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Mikaelson School Club — Every student can lead.',
    template: '%s | Mikaelson School Club',
  },
  description:
    'A structured leadership programme for African secondary schools. Building the next generation of leaders through habit systems, peer leadership, and digital literacy.',
  keywords: [
    'youth leadership',
    'African schools',
    'school club',
    'habit building',
    'leadership programme',
    'digital literacy',
    'secondary school Africa',
    'student leadership',
    'Mikaelson Initiative',
  ],
  authors: [{ name: 'Mikaelson Initiative', url: BASE_URL }],
  creator: 'Mikaelson Initiative',
  publisher: 'Mikaelson Initiative',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Mikaelson School Club',
    title: 'Mikaelson School Club — Every student can lead.',
    description:
      'A structured leadership programme for African secondary schools. Building habits, leadership, and digital literacy — term by term.',
    images: [
      {
        url: '/hero-v3.png',
        width: 1200,
        height: 630,
        alt: 'Mikaelson School Club — Every student can lead.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mikaelson School Club — Every student can lead.',
    description:
      'A structured leadership programme for African secondary schools.',
    images: ['/hero-v3.png'],
    creator: '@MikaelsonInit',
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#5CE1E6',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Mikaelson School Club',
      description:
        'A structured leadership programme for African secondary schools.',
      publisher: { '@id': `${BASE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/blog?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'EducationalOrganization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Mikaelson School Club',
      alternateName: 'Mikaelson Initiative School Club',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/hero-v3.png`,
      },
      description:
        'Building the next generation of African leaders through habit systems, peer leadership, and digital literacy.',
      email: 'hello@mikaelsoninitiative.org',
      areaServed: 'Africa',
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student',
      },
      sameAs: ['https://www.linkedin.com/company/mikaelson-initiative'],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
