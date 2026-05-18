import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';

export default async function sitemap() {
  const baseUrl = 'https://glorycord.com';

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/urunler`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/hakkimizda`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/iletisim`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  try {
    await connectToDatabase();
    const products = await Product.find({}, '_id updatedAt').lean();
    const productRoutes = products.map((p) => ({
      url: `${baseUrl}/urunler/${p._id}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
