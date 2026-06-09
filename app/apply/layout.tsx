import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply',
  description:
    'Apply to bring Mikaelson School Club to your school. Complete our short expression of interest form and we\'ll be in touch within 3 working days.',
  openGraph: {
    title: 'Apply | Mikaelson School Club',
    description: 'Apply to host a Mikaelson School Club chapter at your school.',
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
