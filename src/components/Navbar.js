// Dosya: src/components/Navbar.js
'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <>
      {/* Sadece sarkaç kordonu için gerekli CSS (Masaüstü animasyonu) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes swing {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        .animate-swing {
          transform-origin: top center;
          animation: swing 5s ease-in-out infinite;
        }
        .braided-cord {
          background-color: #FF8A00;
          background-image: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px);
        }
      `}} />

      {/* ANA NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 transition-all duration-300">
        
        {/* İMZA DETAY: SALLANAN KORDON (Sadece Masaüstünde görünür) */}
        <div className="hidden md:flex absolute left-12 top-full flex-col items-center pointer-events-none animate-swing z-50">
          <div className="w-[3px] h-12 braided-cord shadow-[0_0_10px_rgba(255,138,0,0.3)]"></div>
          <div className="w-2.5 h-8 bg-gradient-to-b from-gray-300 via-white to-gray-500 rounded-b-md shadow-[0_10px_20px_rgba(0,0,0,0.5)] relative border-t border-gray-400">
            <div className="absolute top-0 left-0.5 w-[1px] h-full bg-white/80 blur-[0.5px]"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* LOGO ALANI (Mobilde ve Masaüstünde Görünür) */}
            <div className="flex-shrink-0 flex items-center pl-0 md:pl-16 z-50 w-full md:w-auto justify-center md:justify-start">
              <Link href="/" className="group flex items-center gap-3 md:gap-4">
                {/* Görsel Logo */}
                <Image 
                  src="/gloryy.png" 
                  alt="Glory Cord Icon" 
                  width={150} 
                  height={150} 
                  priority
                  className="h-10 md:h-14 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* Metin Logo */}
                <span className="text-xl md:text-2xl font-black tracking-[0.15em] text-white">
                  GLORY<span className="text-[#FF8A00] ml-1">CORD</span>
                </span>
              </Link>
            </div>

            {/* MASAÜSTÜ MENÜ (Sadece bilgisayarda görünür: hidden md:flex) */}
            <div className="hidden md:flex space-x-12 items-center">
              {[
                { name: 'Ana Sayfa', path: '/' },
                { name: 'Hakkımızda', path: '/hakkimizda' },
                { name: 'Ürünler', path: '/urunler' },
                { name: 'İletişim', path: '/iletisim' }
              ].map((link, index) => (
                <Link key={index} href={link.path} className="relative group py-2">
                  <span className="text-[10px] font-black text-gray-400 group-hover:text-white transition-colors uppercase tracking-[0.3em]">
                    {link.name}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF8A00] transition-all duration-500 ease-out group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* MASAÜSTÜ BUTON (Sadece bilgisayarda görünür: hidden md:flex) */}
            <div className="hidden md:flex items-center">
              <Link href="/iletisim" className="px-8 py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-[#FF8A00] hover:text-black hover:shadow-[0_0_30px_rgba(255,138,0,0.4)] transition-all duration-300 transform hover:-translate-y-1 cursor-none">
                Siparişi Başlat
              </Link>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}