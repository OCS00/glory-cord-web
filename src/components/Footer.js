// Dosya: src/components/Footer.js
'use client';
import Link from 'next/link';

export default function Footer() {
  
  return (
    <footer className="relative bg-[#050505] pt-10 md:pt-24 overflow-hidden font-sans selection:bg-[#FF8A00] selection:text-black">
      

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* ANA İÇERİK IZGARASI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pt-6 md:pt-10 pb-10 md:pb-20 border-t border-white/5 text-center md:text-left">
          
          {/* 1. SÜTUN: Logo & Marka Felsefesi */}
          <div className="lg:col-span-5 flex flex-col justify-between items-center md:items-start">
            <div className="flex flex-col items-center md:items-start">
              <Link href="/" className="inline-block mb-4 md:mb-6 group">
                <img 
                  src="/gloryy.png" 
                  alt="Glory Cord Logo" 
                  className="h-10 md:h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = ''; 
                    e.target.alt = 'GLORY CORD';
                  }}
                />
              </Link>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-sm">
                Endüstriyel Mükemmellik. <br className="hidden md:block"/> Lüks Dokunuş.
              </p>
            </div>

            <div className="mt-6 md:mt-12">
              {/* 🌟 YENİ: INSTAGRAM LİNKİ ENTEGRE EDİLDİ 🌟 */}
              <a 
                href="https://www.instagram.com/glorycordcom?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group inline-flex items-center gap-4 text-gray-500 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-[#FF8A00] bg-[#0a0a0a] group-hover:bg-[#FF8A00]/10 flex items-center justify-center transition-all duration-500 shadow-[0_0_0_rgba(255,138,0,0)] group-hover:shadow-[0_0_20px_rgba(255,138,0,0.2)]">
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-[#FF8A00] transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase">Instagram'da Biz</span>
              </a>
            </div>
          </div>

          {/* 2. SÜTUN: Navigasyon */}
          <div className="lg:col-span-3 lg:col-start-7 flex flex-col items-center md:items-start">
            <h4 className="text-white font-black text-[9px] uppercase tracking-[0.3em] mb-4 md:mb-8 border-b md:border-b-0 md:border-l border-[#FF8A00] pb-2 md:pb-0 md:pl-3 w-max">Navigasyon</h4>
            <ul className="space-y-3 md:space-y-5 flex flex-col items-center md:items-start text-[10px] font-bold tracking-widest uppercase text-gray-500">
              <Link href="/" className="hover:text-white transition-colors w-max relative group flex items-center gap-2">
                <span className="hidden md:block w-1 h-1 bg-transparent group-hover:bg-[#FF8A00] rounded-full transition-colors"></span>
                Ana Sayfa
              </Link>
              <Link href="/urunler" className="hover:text-white transition-colors w-max relative group flex items-center gap-2">
                <span className="hidden md:block w-1 h-1 bg-transparent group-hover:bg-[#FF8A00] rounded-full transition-colors"></span>
                Koleksiyon
              </Link>
              <Link href="/hakkimizda" className="hover:text-white transition-colors w-max relative group flex items-center gap-2">
                <span className="hidden md:block w-1 h-1 bg-transparent group-hover:bg-[#FF8A00] rounded-full transition-colors"></span>
                Manifesto
              </Link>
            </ul>
          </div>

          {/* 3. SÜTUN: İletişim Bilgileri */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start">
            <h4 className="text-white font-black text-[9px] uppercase tracking-[0.3em] mb-4 md:mb-8 border-b md:border-b-0 md:border-l border-[#FF8A00] pb-2 md:pb-0 md:pl-3 w-max">İletişim</h4>
            <ul className="space-y-3 md:space-y-6 flex flex-col items-center md:items-start text-[10px] font-bold tracking-widest uppercase text-gray-500 text-center md:text-left">
              
              <li>
                <span className="block text-gray-700 text-[8px] mb-1">E-POSTA</span>
                <a href="mailto:ibrahimhalilsahin1@gmail.com" className="hover:text-white transition-colors w-max relative group text-gray-300">
                  ibrahimhalilsahin1@gmail.com
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FF8A00] group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>

              <li>
                <span className="block text-gray-700 text-[8px] mb-1">TELEFON</span>
                <a href="tel:+905318153611" className="hover:text-white transition-colors w-max relative group text-gray-300">
                  +90 (531) 815 36 11
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FF8A00] group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>

              <li>
                <span className="block text-gray-700 text-[8px] mb-1">MERKEZ & FABRİKA</span>
                <span className="text-gray-400 block leading-relaxed">
                  Menderes Mah. 15 Temmuz <br className="hidden md:block"/> Şehitler Ve Gaziler Cad.<br className="hidden md:block"/> No: 1/4 Kahta / Adıyaman
                </span>
              </li>

            </ul>
          </div>

        </div>

        {/* 🌟 ALT ÇİZGİ: Telif Hakkı ve OCS Creative İmzası 🌟 */}
        <div className="border-t border-white/5 py-4 md:py-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-6 text-center md:text-left">
          
          <p className="text-[9px] font-black tracking-widest uppercase text-gray-600">
            © {new Date().getFullYear()} GLORY CORD. TÜM HAKLARI SAKLIDIR.
          </p>

          <a 
            href="https://ocscreative.com.tr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-1.5 group transition-all duration-300 text-[9px] font-black tracking-widest uppercase text-gray-600"
          >
            CREATED BY 
            <span className="text-white group-hover:text-[#FF8A00] transition-colors relative ml-1">
              OCS CREATIVE
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FF8A00] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>

        </div>

      </div>
    </footer>
  );
}