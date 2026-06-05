import { MetadataRoute } from 'next';

const BASE_URL = 'https://mikaelsonschoolclub.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/about`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/programme`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/for-schools`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/for-students`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/apply`, priority: 0.9, changeFrequency: 'monthly' as const },
  ];

  const secondary = [
    { url: `${BASE_URL}/chapters`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/leadership`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/impact`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/partners`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/resources`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/events`, priority: 0.6, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/blog`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/faqs`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/contact`, priority: 0.6, changeFrequency: 'yearly' as const },
  ];

  const legal = [
    { url: `${BASE_URL}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${BASE_URL}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  return [...core, ...secondary, ...legal].map((route) => ({
    ...route,
    lastModified: now,
  }));
}
