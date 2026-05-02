// Dosya: src/app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileBottomNav from '../components/MobileBottomNav'; // 🌟 YENİ EKLENDİ

export const metadata = {
  title: 'Glory Cord | Premium Kordon Üretimleri',
  description: 'Tekstil, sweatshirt ve eşofmanlar için yüksek kaliteli, özelleştirilebilir kordon ve kordon ucu çözümleri.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      {/* 🌟 DİKKAT: pb-16 md:pb-0 ekledik ki mobil menü en alttaki yazıları (footer'ı) kapatmasın */}
      <body className="bg-[#050505] antialiased flex flex-col min-h-screen pb-16 md:pb-0">
        
        <Navbar />
        
        {/* Sayfa içeriklerinin sayfanın geri kalanını kaplaması için flex-grow ekliyoruz */}
        <div className="flex-grow">
          {children}
        </div>
        
        <Footer />
        
        {/* 🌟 MOBİL ALT MENÜ (Sadece telefonda görünür) */}
        <MobileBottomNav />
        
      </body>
    </html>
  );
}