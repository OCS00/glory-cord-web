// Dosya: src/app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Yeni Footer'ımızı buraya çağırdık

export const metadata = {
  title: 'Glory Cord | Premium Kordon Çözümleri',
  description: 'Tekstil, sweatshirt ve eşofmanlar için yüksek kaliteli, özelleştirilebilir kordon ve kordon ucu çözümleri.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-[#373737] antialiased flex flex-col min-h-screen">
        <Navbar />
        
        {/* Sayfa içeriklerinin sayfanın geri kalanını kaplaması için flex-grow ekliyoruz */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Footer en alta yerleşti */}
        <Footer />
      </body>
    </html>
  );
}