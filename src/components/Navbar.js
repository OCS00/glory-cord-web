'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes swing {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        .animate-swing { transform-origin: top center; animation: swing 5s ease-in-out infinite; }
        .braided-cord {
          background-color: #FF8A00;
          background-image: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px);
        }
      `}} />

      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 transition-all duration-300">

        {/* SALLANAN KORDON — sadece masaüstü */}
        <div className="hidden md:flex absolute left-12 top-full flex-col items-center pointer-events-none animate-swing z-50">
          <div className="w-[3px] h-12 braided-cord shadow-[0_0_10px_rgba(255,138,0,0.3)]"></div>
          <div className="w-2.5 h-8 bg-gradient-to-b from-gray-300 via-white to-gray-500 rounded-b-md shadow-[0_10px_20px_rgba(0,0,0,0.5)] relative border-t border-gray-400">
            <div className="absolute top-0 left-0.5 w-[1px] h-full bg-white/80 blur-[0.5px]"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16 md:h-24">

            {/* LOGO */}
            <Link href="/" className="group flex items-center gap-1 md:pl-16 flex-shrink-0">
              <Image
                src="/gloryy.png"
                alt="Glory Cord"
                width={100}
                height={100}
                priority
                className="h-6 md:h-8 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-base md:text-2xl font-bold uppercase tracking-[0.04em] text-white">
                LORY<span className="text-[#FF8A00] ml-2 md:ml-3">CORD</span>
              </span>
            </Link>

            {/* MASAÜSTÜ MENÜ */}
            <div className="hidden md:flex space-x-12 items-center">
              {[
                { name: 'Ana Sayfa', path: '/' },
                { name: 'Hakkımızda', path: '/hakkimizda' },
                { name: 'Ürünler', path: '/urunler' },
                { name: 'İletişim', path: '/iletisim' },
              ].map((link) => (
                <Link key={link.path} href={link.path} className="relative group py-2">
                  <span className="text-[10px] font-black text-gray-400 group-hover:text-white transition-colors uppercase tracking-[0.3em]">
                    {link.name}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF8A00] transition-all duration-500 ease-out group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* MASAÜSTÜ BUTON */}
            <div className="hidden md:flex items-center">
              <Link href="/iletisim" className="px-8 py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-[#FF8A00] hover:text-black hover:shadow-[0_0_30px_rgba(255,138,0,0.4)] transition-all duration-300 transform hover:-translate-y-1">
                Siparişi Başlat
              </Link>
            </div>

            {/* MOBİL BUTON — sadece küçük ekranda görünür */}
            <a
              href="tel:+905318153611"
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-[#FF8A00]/10 border border-[#FF8A00]/30 text-[#FF8A00] rounded-xl text-[10px] font-black tracking-widest uppercase"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Ara
            </a>

          </div>
        </div>
      </nav>
    </>
  );
}
