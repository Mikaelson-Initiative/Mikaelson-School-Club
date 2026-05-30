import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply',
  description:
    'Apply to bring the Club to your school. Complete our short expression of interest form and we\'ll be in touch within 3 working days.',
  openGraph: {
    title: 'Apply | Club',
    description: 'Apply to host a Club chapter at your school.',
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
