// Dosya: src/components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-20 overflow-hidden font-sans selection:bg-[#FF8A00] selection:text-black">
      
      {/* 🌟 ARKA PLAN DEV TİPOGRAFİ (Lüks Marka İmzası) 🌟 */}
      <div className="absolute top-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none opacity-[0.03]">
        
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ANA İÇERİK IZGARASI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pt-10 pb-20 border-t border-white/10">
          
          {/* 1. SÜTUN: Marka & Felsefe (Geniş Alan) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block text-3xl font-black text-white tracking-widest uppercase mb-4">
                GLORY<span className="text-[#FF8A00]">CORD.</span>
              </Link>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-sm">
                Endüstriyel Mükemmellik. <br/> Lüks Dokunuş.
              </p>
            </div>

            {/* Instagram Butonu (Özel Tasarım) */}
            <div className="mt-12">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group inline-flex items-center gap-4 text-gray-500 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-[#FF8A00] bg-[#111] group-hover:bg-[#FF8A00]/10 flex items-center justify-center transition-all duration-500 shadow-[0_0_0_rgba(255,138,0,0)] group-hover:shadow-[0_0_20px_rgba(255,138,0,0.3)]">
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-[#FF8A00] transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase">Instagram'da Bizi Takip Edin</span>
              </a>
            </div>
          </div>

          {/* 2. SÜTUN: Navigasyon */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-white font-black text-[9px] uppercase tracking-[0.3em] mb-6">Navigasyon</h4>
            <ul className="space-y-4 flex flex-col text-[10px] font-bold tracking-widest uppercase text-gray-500">
              <Link href="/" className="hover:text-white transition-colors w-max relative group">
                Ana Sayfa
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF8A00] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/urunler" className="hover:text-white transition-colors w-max relative group">
                Koleksiyon
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF8A00] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/hakkimizda" className="hover:text-white transition-colors w-max relative group">
                Manifesto
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF8A00] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </ul>
          </div>

          {/* 3. SÜTUN: İletişim */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-black text-[9px] uppercase tracking-[0.3em] mb-6">Bize Ulaşın</h4>
            <ul className="space-y-4 flex flex-col text-[10px] font-bold tracking-widest uppercase text-gray-500">
              <a href="mailto:info@glorycord.com" className="hover:text-white transition-colors w-max relative group">
                INFO@GLORYCORD.COM
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF8A00] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="tel:+905551234567" className="hover:text-white transition-colors w-max relative group">
                +90 555 123 45 67
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF8A00] group-hover:w-full transition-all duration-300"></span>
              </a>
              <span className="text-gray-700 pt-2 block">
                ORGANİZE SANAYİ BÖLGESİ<br/>
                İSTANBUL / TÜRKİYE
              </span>
            </ul>
          </div>

        </div>

        {/* 🌟 ALT ÇİZGİ: Telif Hakkı ve OCS Creative İmzası 🌟 */}
        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <p className="text-[9px] font-black tracking-widest uppercase text-gray-600">
            © {new Date().getFullYear()} GLORY CORD. TÜM HAKLARI SAKLIDIR.
          </p>

          <a 
            href="https://ocscreative.com.tr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 group transition-all duration-300 text-[9px] font-black tracking-widest uppercase text-gray-600"
          >
            CREATED BY 
            <span className="text-white group-hover:text-[#FF8A00] transition-colors relative ml-1">
              OCS CREATIVE
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF8A00] transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>

        </div>

      </div>
    </footer>
  );
}