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

export const metadata = {
  metadataBase: new URL('https://glorycord.com.tr'),
  title: {
    default: 'GLORY CORD | Premium Kordon Üretimi',
    template: '%s | Glory Cord',
  },
  description: 'Metal uçlu, silikon uçlu ve özel kalıp kordon çözümleri. Türkiye\'nin premium tekstil kordon üreticisi — milimetrik hassasiyetle, sıfır hata toleransıyla.',
  keywords: ['kordon', 'kordon üretimi', 'metal uçlu kordon', 'silikon uçlu kordon', 'özel kalıp kordon', 'tekstil aksesuar', 'glory cord', 'kordon üretici', 'toptan kordon'],
  authors: [{ name: 'Glory Cord' }],
  creator: 'Glory Cord',
  publisher: 'Glory Cord',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://glorycord.com.tr',
    siteName: 'Glory Cord',
    title: 'GLORY CORD | Premium Kordon Üretimi',
    description: 'Metal uçlu, silikon uçlu ve özel kalıp kordon çözümleri. Türkiye\'nin premium kordon üreticisi.',
    images: [{ url: '/gloryy.png', width: 1200, height: 630, alt: 'Glory Cord Premium Kordon' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GLORY CORD | Premium Kordon Üretimi',
    description: 'Metal uçlu, silikon uçlu ve özel kalıp kordon çözümleri.',
    images: ['/gloryy.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/gloryy.png',
    apple: '/gloryy.png',
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