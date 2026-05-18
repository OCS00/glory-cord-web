'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden flex flex-col items-center justify-center relative selection:bg-[#FF8A00] selection:text-black">

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes glitch1 { 0%, 90%, 100% { transform: translate(0); } 91% { transform: translate(-3px, 2px); } 93% { transform: translate(3px, -1px); } 95% { transform: translate(-2px, 1px); } }
        @keyframes glitch2 { 0%, 90%, 100% { transform: translate(0); clip-path: none; } 91% { transform: translate(3px, -2px); clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); } 93% { transform: translate(-3px, 1px); clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }
        .glitch { animation: glitch1 4s infinite; position: relative; }
        .glitch::after { content: attr(data-text); position: absolute; inset: 0; color: #FF8A00; animation: glitch2 4s infinite; opacity: 0.7; }
        .float-anim { animation: float 6s ease-in-out infinite; }
        .pulse-ring { animation: pulse-ring 2s ease-out infinite; }
      `}} />

      {/* ARKA PLAN IŞIK EFEKTI */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF8A00] opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#050505_100%)] pointer-events-none" />

      {/* GRİD DESEN */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#FF8A00 1px, transparent 1px), linear-gradient(90deg, #FF8A00 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* TARAMA ÇİZGİSİ (Scanline) */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF8A00]/20 to-transparent pointer-events-none z-10" style={{ animation: 'scanline 8s linear infinite' }} />

      {/* İÇERİK */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">

        {/* LOGO */}
        <div className="float-anim mb-10 relative">
          <div className="w-20 h-20 bg-[#FF8A00]/10 border border-[#FF8A00]/20 rounded-2xl flex items-center justify-center text-3xl font-black text-[#FF8A00] relative shadow-[0_0_40px_rgba(255,138,0,0.1)]">
            GC
            <div className="absolute inset-0 rounded-2xl border border-[#FF8A00]/20 pulse-ring" />
          </div>
        </div>

        {/* 404 YAZISI */}
        <div className="relative mb-4">
          <h1
            className="glitch text-[10rem] md:text-[16rem] font-black leading-none tracking-tighter select-none"
            data-text="404"
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,138,0,0.5)',
            }}
          >
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10rem] md:text-[16rem] font-black leading-none tracking-tighter text-white/[0.04] select-none">404</span>
          </div>
        </div>

        {/* AYIRICI */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#FF8A00]/60" />
          <span className="text-[#FF8A00] text-[10px] font-black tracking-[0.4em] uppercase">Sayfa Bulunamadı</span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#FF8A00]/60" />
        </div>

        {/* AÇIKLAMA */}
        <p className="text-gray-400 text-base md:text-lg font-light max-w-md leading-relaxed mb-3">
          Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
        </p>
        <p className="text-gray-600 text-xs tracking-widest uppercase font-bold mb-12">
          URL'yi kontrol edin veya ana sayfaya dönün.
        </p>

        {/* BUTONLAR */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#FF8A00] text-black font-black text-xs uppercase tracking-[0.3em] rounded-full shadow-[0_0_20px_rgba(255,138,0,0.3)] hover:shadow-[0_0_40px_rgba(255,138,0,0.6)] hover:bg-white transition-all transform hover:-translate-y-1"
          >
            Ana Sayfaya Dön
            <span className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/urunler"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/10 hover:border-[#FF8A00]/40 text-gray-400 hover:text-white font-black text-xs uppercase tracking-[0.3em] rounded-full transition-all"
          >
            Koleksiyona Bak
          </Link>
        </div>

        {/* ALT BİLGİ SATIRI */}
        <div className="mt-16 flex items-center gap-6 text-gray-700 text-[10px] font-bold tracking-widest uppercase">
          <span>Hata Kodu: 404</span>
          <span className="w-1 h-1 bg-gray-700 rounded-full" />
          <span>Glory Cord</span>
          <span className="w-1 h-1 bg-gray-700 rounded-full" />
          <span>Premium Kordon</span>
        </div>
      </div>

      {/* SAĞDAN SOL KAYAN METİN (MARQUEE) */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/5 py-4 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: 'scrollLeft 20s linear infinite' }}>
          <span className="text-white/5 font-black text-sm tracking-widest uppercase mx-4 shrink-0">
            ✦ SAYFA BULUNAMADI ✦ 404 ✦ GLORY CORD ✦ PREMIUM KORDON ✦ METAL UÇLU ✦ SİLİKON ✦ ÖZEL KALIP ✦ SAYFA BULUNAMADI ✦ 404 ✦ GLORY CORD ✦ PREMIUM KORDON ✦ METAL UÇLU ✦ SİLİKON ✦ ÖZEL KALIP
          </span>
          <span className="text-white/5 font-black text-sm tracking-widest uppercase mx-4 shrink-0">
            ✦ SAYFA BULUNAMADI ✦ 404 ✦ GLORY CORD ✦ PREMIUM KORDON ✦ METAL UÇLU ✦ SİLİKON ✦ ÖZEL KALIP ✦ SAYFA BULUNAMADI ✦ 404 ✦ GLORY CORD ✦ PREMIUM KORDON ✦ METAL UÇLU ✦ SİLİKON ✦ ÖZEL KALIP
          </span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}} />
    </div>
  );
}
