import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chapters',
  description:
    'Find Mikaelson School Club chapters across Africa, Lagos, Accra, Nairobi, Soweto, Kampala and more. Or apply to start one at your school.',
  openGraph: {
    title: 'Chapters | Mikaelson School Club',
    description: 'Find a Mikaelson School Club chapter near you, or start one at your school.',
  },
};

export default function ChaptersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
