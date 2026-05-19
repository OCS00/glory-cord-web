// Dosya: src/app/layout.js
import { Montserrat } from 'next/font/google';
import './globals.css';

// 🌟 1. ADIM: BİLEŞENLERİ (COMPONENTS) İÇERİ AKTARMA 🌟
// Navbar ve Footer dosyalarımızı ana şablonda kullanmak üzere çağırıyoruz.
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

// Lüks tipografi ayarımız (Önceki adımdan)
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['300', '400', '600', '700', '900'],
  display: 'swap', 
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'GLORY CORD',
      url: 'https://glorycord.com',
    },
    {
      '@type': 'Organization',
      name: 'Glory Cord',
      url: 'https://glorycord.com',
      logo: 'https://glorycord.com/gloryy.png',
      image: 'https://glorycord.com/gloryy.png',
      description: 'Metal uçlu, silikon uçlu ve özel kalıp kordon çözümleri. Türkiye\'nin premium tekstil kordon üreticisi.',
      telephone: '+905318153611',
      email: 'ibrahimhalilsahin1@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Menderes Mah. 15 Temmuz Şehitler Ve Gaziler Cad. No: 1/4',
        addressLocality: 'Kahta',
        addressRegion: 'Adıyaman',
        addressCountry: 'TR',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+905318153611',
        contactType: 'customer service',
        availableLanguage: 'Turkish',
      },
    },
  ],
};

export const metadata = {
  metadataBase: new URL('https://glorycord.com'),
  title: {
    default: 'Glory Cord | Türkiye\'nin Kordon Üreticisi — Metal Uçlu, Silikon Uçlu, Özel Kalıp & Toptan Kordon',
    template: '%s | Glory Cord — Kordon Üreticisi',
  },
  description: 'Metal uçlu kordon, silikon uçlu kordon, yuvarlak kordon ve yassı kordon üretiminde Türkiye\'nin önde gelen tesisi. Polyester, pamuk, naylon iplik seçenekleri. Toptan ve markalı üretim — hızlı numune.',
  keywords: [
    'kordon', 'kordon üretimi', 'kordon üreticisi', 'toptan kordon',
    'metal uçlu kordon', 'silikon uçlu kordon', 'plastik uçlu kordon', 'özel kalıp kordon',
    'yuvarlak kordon', 'yassı kordon', 'elastik kordon', 'örgülü kordon', 'baskılı kordon',
    'polyester kordon', 'pamuk kordon', 'naylon kordon', 'akrilik kordon',
    'tekstil iplik', 'tekstil aksesuar', 'giyim aksesuar', 'moda aksesuar',
    'glory cord', 'glorycord',
    'adıyaman kordon', 'kahta kordon', 'türkiye kordon üreticisi',
    'lazer kesimli kordon', 'termoplastik uçlu kordon', 'deri uçlu kordon',
    'numune talebi', 'özel üretim', 'markalı kordon', 'kordon imalatı',
    'ip', 'iplik', 'kordon imalatçısı', 'şerit', 'tekstil şerit',
  ],
  authors: [{ name: 'Glory Cord' }],
  creator: 'Glory Cord',
  publisher: 'Glory Cord',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://glorycord.com',
    siteName: 'Glory Cord',
    title: 'Glory Cord | Türkiye\'nin Kordon Üreticisi — Metal Uçlu, Silikon Uçlu & Özel Kalıp',
    description: 'Metal uçlu kordon, silikon uçlu kordon, yuvarlak & yassı kordon üretimi. Polyester, pamuk, naylon iplik. 18M+ metre/yıl kapasite — toptan ve markalı üretim.',
    images: [{ url: '/gloryy.png', width: 252, height: 249, alt: 'Glory Cord — Premium Kordon Üreticisi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glory Cord | Türkiye\'nin Kordon Üreticisi',
    description: 'Metal uçlu, silikon uçlu ve özel kalıp kordon üretimi. Toptan ve markalı üretim için hızlı numune dönüşü.',
    images: ['/gloryy.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      {/* 🌟 2. ADIM: SAYFA İSKELETİNİ KURMA 🌟 */}
      {/* 
        flex, flex-col ve min-h-screen: Tüm ekranı kaplayan dikey bir sütun oluşturur.
        Böylece sayfa içeriği az olsa bile Footer her zaman en altta kalır.
      */}
      <body className={`${montserrat.className} bg-[#050505] text-white antialiased flex flex-col min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Her sayfanın en üstünde otomatik olarak çıkacak Üst Menü */}
        <Navbar />

        {/* 
          Her sayfanın kendi içeriği (children) buraya gelir. 
          flex-grow: Eğer içerik kısaysa bile bu alan uzayarak boşluğu doldurur, Footer'ı aşağı iter.
        */}
        <main className="flex-grow pb-16 md:pb-0">
          {children}
        </main>

        <Footer />
        <MobileBottomNav />

      </body>
    </html>
  );
}