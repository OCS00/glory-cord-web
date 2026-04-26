// Dosya: src/components/Navbar.js
'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Sadece sarkaç kordonu için gerekli CSS */}
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
        
        {/* 🌟 İMZA DETAY: SALLANAN KORDON (Sadece Masaüstünde) 🌟 */}
        <div className="hidden md:flex absolute left-12 top-full flex-col items-center pointer-events-none animate-swing z-50">
          <div className="w-[3px] h-12 braided-cord shadow-[0_0_10px_rgba(255,138,0,0.3)]"></div>
          <div className="w-2.5 h-8 bg-gradient-to-b from-gray-300 via-white to-gray-500 rounded-b-md shadow-[0_10px_20px_rgba(0,0,0,0.5)] relative border-t border-gray-400">
            <div className="absolute top-0 left-0.5 w-[1px] h-full bg-white/80 blur-[0.5px]"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* LOGO */}
            <div className="flex-shrink-0 flex items-center pl-0 md:pl-16 z-50">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center">
                <span className="text-2xl md:text-3xl font-black tracking-[0.1em] text-white">
                  GLORY<span className="text-[#FF8A00] ml-1 md:ml-2">CORD</span>
                </span>
              </Link>
            </div>

            {/* MASAÜSTÜ MENÜ */}
            <div className="hidden md:flex space-x-12 items-center">
              {[
                { name: 'Ana Sayfa', path: '/' },
                { name: 'Manifesto', path: '/hakkimizda' },
                { name: 'Koleksiyon', path: '/urunler' },
                { name: 'İletişim', path: '/iletisim' }
              ].map((link, index) => (
                <Link key={index} href={link.path} className="relative group py-2">
                  <span className="text-[10px] font-black text-gray-400 group-hover:text-white transition-colors uppercase tracking-[0.3em]">
                    {link.name}
                  </span>
                  {/* Turuncu Kordon Alt Çizgisi */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF8A00] transition-all duration-500 ease-out group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* MASAÜSTÜ BUTON */}
            <div className="hidden md:flex items-center">
              <Link href="/iletisim" className="px-8 py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-[#FF8A00] hover:text-black hover:shadow-[0_0_30px_rgba(255,138,0,0.4)] transition-all duration-300 transform hover:-translate-y-1 cursor-none">
                Projeyi Başlat
              </Link>
            </div>

            {/* MOBİL HAMBURGER BUTONU */}
            <div className="md:hidden flex items-center z-50">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white focus:outline-none w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              >
                <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px] bg-[#FF8A00]' : ''}`}></span>
                <span className={`block w-6 h-[2px] bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px] bg-[#FF8A00]' : ''}`}></span>
              </button>
            </div>

          </div>
        </div>

        {/* MOBİL TAM EKRAN MENÜ */}
        <div className={`fixed inset-0 bg-[#050505] z-40 transition-all duration-500 flex flex-col justify-center px-8 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'}`}>
          <div className="flex flex-col space-y-8 text-left">
            {[
              { name: 'Ana Sayfa', path: '/' },
              { name: 'Manifesto', path: '/hakkimizda' },
              { name: 'Koleksiyon', path: '/urunler' },
              { name: 'İletişim', path: '/iletisim' }
            ].map((link, index) => (
              <Link 
                key={index} 
                href={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-4xl font-black text-white uppercase tracking-tighter hover:text-[#FF8A00] transition-colors border-b border-white/5 pb-4"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/iletisim" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-8 px-8 py-5 bg-[#FF8A00] text-black font-black text-xs uppercase tracking-[0.3em] rounded-full text-center"
            >
              Projeyi Başlat
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}