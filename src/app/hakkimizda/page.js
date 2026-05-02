// Dosya: src/app/hakkimizda/page.js
'use client'; 
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Hakkimizda() {
  // --- 1. DEĞİŞKENLER VE DURUMLAR (STATE) ---
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // --- 2. FARE İMLECİ TAKİBİ ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- 3. ANİMASYON AYARLARI (FRAMER MOTION) ---
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#FF8A00] selection:text-black cursor-none font-sans overflow-x-hidden">
      
      {/* 🌟 LÜKS İMLEÇ 🌟 */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-[#FF8A00] rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ transform: `translate3d(${mousePos.x - 4}px, ${mousePos.y - 4}px, 0)` }}
      ></div>
      <div 
        className={`fixed top-0 left-0 w-10 h-10 border border-[#FF8A00]/50 rounded-full pointer-events-none z-[99] transition-all duration-300 ease-out hidden md:block ${isHovering ? 'scale-[2.5] bg-[#FF8A00]/10 border-[#FF8A00]' : 'scale-100'}`}
        style={{ transform: `translate3d(${mousePos.x - 20}px, ${mousePos.y - 20}px, 0)` }}
      ></div>

      <style dangerouslySetInnerHTML={{__html: `
        .text-outline { color: transparent; -webkit-text-stroke: 1px rgba(255,138,0,0.8); }
        @keyframes slowPan {
          0% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.1) translate(-1%, 1%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
        .animate-slow-pan { animation: slowPan 30s ease-in-out infinite; }
      `}} />

      {/* 1. SİNEMATİK HERO (GİRİŞ) */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5 flex items-center justify-center text-center h-[80vh] md:h-screen">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605289355680-75fb41239154?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity animate-slow-pan"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF8A00] opacity-10 rounded-full blur-[150px] pointer-events-none"></div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <motion.span variants={fadeUp} className="text-[#FF8A00] font-black tracking-[0.4em] text-xs uppercase mb-4 md:mb-6 block">Glory Cord Manifestosu</motion.span>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-[8rem] font-black mb-4 md:mb-6 tracking-tighter uppercase leading-[0.9] text-white">
            MİRAS VE <br className="hidden md:block"/> 
            <span className="text-outline">GELECEK.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide mt-8 border-l-2 border-[#FF8A00] pl-4 md:pl-6 text-left md:text-center md:border-l-0 md:border-t-2 md:pt-6">
            Yılların getirdiği endüstriyel tecrübeyi, modern tasarım anlayışıyla harmanlayarak tekstil dünyasının gizli kahramanlarını üretiyoruz.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. BİZ KİMİZ? */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center">
          
          {/* Sol: Metin */}
          <div className="w-full lg:w-1/2">
            <motion.h2 variants={fadeUp} className="text-[#FF8A00] font-black tracking-[0.3em] uppercase mb-4 text-xs">Kökenlerimiz</motion.h2>
            <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">Detaylardaki <br/> <span className="text-gray-500">Büyük Tablo.</span></motion.h3>
            
            <motion.div variants={fadeUp} className="space-y-6 text-gray-400 font-light leading-relaxed text-sm md:text-base">
              <p>
                Tekstil üretiminde bir kıyafetin kalitesi, onu tamamlayan en küçük aksesuarda gizlidir. Glory Cord olarak yıllar önce bu vizyonla yola çıktık. Standartların yetersiz kaldığı bir piyasada, markalara <strong className="text-white font-bold">"kendi kimliklerini yansıtabilecekleri"</strong> kusursuz kordon çözümleri sunmayı hedefledik.
              </p>
              <p>
                Bugün, yüksek kapasiteli entegre tesisimizde ipliğin bükülmesinden dokumasına, boyanmasından uçlarının lazerle işlenmesine kadar tüm süreçleri kendi bünyemizde sıfır hata toleransıyla gerçekleştiriyoruz.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/5">
              <div>
                <span className="block text-4xl md:text-5xl font-black text-white mb-2">18M<span className="text-[#FF8A00]">+</span></span>
                <span className="text-xs text-gray-500 font-black tracking-widest uppercase">Yıllık Üretim (Metre)</span>
              </div>
            </motion.div>
          </div>

          {/* Sağ: Fabrika Görsel Kutusu */}
          <motion.div variants={fadeUp} className="w-full lg:w-1/2">
            <div 
              className="relative rounded-[2rem] overflow-hidden h-[400px] md:h-[600px] border border-white/10 group bg-[#111]"
              onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
            >
              {/* DİKKAT: Fabrika resmin buraya entegre edildi */}
              <div className="absolute inset-0 bg-[url('/fabrika.jpg')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute inset-6 border border-white/20 rounded-[1rem] pointer-events-none transition-all duration-700 group-hover:inset-4 group-hover:border-[#FF8A00]/50"></div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="backdrop-blur-md bg-black/40 p-4 rounded-xl border border-white/10">
                  <p className="text-[#FF8A00] font-black text-[10px] tracking-widest uppercase mb-1">Entegre Tesis</p>
                  <p className="text-white text-sm md:text-base font-medium">Tüm üretim süreçleri tek bir çatı altında kontrol edilir.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* 3. DEĞERLERİMİZ */}
      <section className="py-20 md:py-32 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16 md:mb-24">
            <motion.h2 variants={fadeUp} className="text-[#FF8A00] font-black tracking-[0.3em] uppercase mb-4 text-xs">İlkelerimiz</motion.h2>
            <motion.h3 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white">BİZİ FARKLI KILAN <br className="hidden md:block"/> <span className="text-gray-600">DEĞERLER</span></motion.h3>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <motion.div variants={fadeUp} className="bg-[#111] p-8 md:p-12 rounded-[2rem] border border-white/5 hover:border-[#FF8A00]/40 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8A00]/5 rounded-full blur-2xl group-hover:bg-[#FF8A00]/10 transition-colors"></div>
              <div className="w-16 h-16 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-[#FF8A00] text-2xl mb-8 group-hover:scale-110 transition-transform">🎯</div>
              <h4 className="text-2xl font-black text-white mb-4">Mühendislik Hassasiyeti</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light">Üretim hattımızdan çıkan her kordon, tam otomatik kalite kontrol sensörlerinden geçer. Kopma, esneme veya renk atmasına karşı sıfır toleransla çalışıyoruz.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-[#111] p-8 md:p-12 rounded-[2rem] border border-white/5 hover:border-[#FF8A00]/40 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8A00]/5 rounded-full blur-2xl group-hover:bg-[#FF8A00]/10 transition-colors"></div>
              <div className="w-16 h-16 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-[#FF8A00] text-2xl mb-8 group-hover:scale-110 transition-transform">🌍</div>
              <h4 className="text-2xl font-black text-white mb-4">Sürdürülebilir Üretim</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light">Ekolojik ayak izimizi küçültmek adına Oeko-Tex standartlarında doğa dostu boyalar kullanıyor, atık ipliklerimizi geri dönüşüme kazandırıyoruz.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-[#111] p-8 md:p-12 rounded-[2rem] border border-white/5 hover:border-[#FF8A00]/40 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8A00]/5 rounded-full blur-2xl group-hover:bg-[#FF8A00]/10 transition-colors"></div>
              <div className="w-16 h-16 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-[#FF8A00] text-2xl mb-8 group-hover:scale-110 transition-transform">⚡</div>
              <h4 className="text-2xl font-black text-white mb-4">İnovatif Yaklaşım</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light">Sadece ip üretmiyoruz. Lazer kesimli özel alaşımlar, ısıya dayanıklı soft-touch silikonlar ile markalara teknolojik aksesuar çözümleri sunuyoruz.</p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ================= 8. FİNAL KAPANIŞ (MİNİMAL VERSİYON) ================= */}
      <section className="relative py-16 md:py-24 border-t border-white/5 flex items-center justify-center bg-[#050505] overflow-hidden">
        
        {/* Arka Plan "GC" Yazısı (Boyutu ve Opaklığı Küçültüldü) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[15rem] font-black text-[#FF8A00]/[0.03] select-none pointer-events-none tracking-tighter leading-none w-full text-center">GC.</div>
        
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={staggerContainer} 
          className="relative z-10 px-6 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
        >
          {/* Sol Taraf: Başlık */}
          <div className="text-center md:text-left">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              İz Bırakmaya Hazır Mıyız?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-xs tracking-widest uppercase mt-3 font-bold">
              Projeniz için üretim detaylarını konuşalım.
            </motion.p>
          </div>
          
          {/* Sağ Taraf: Buton (Daha zarif padding değerleriyle) */}
          <motion.div variants={fadeUp} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="flex-shrink-0">
            <Link href="/iletisim" className="inline-block px-8 py-4 bg-[#FF8A00] text-black rounded-full font-black text-[10px] md:text-xs tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(255,138,0,0.2)] hover:shadow-[0_0_40px_rgba(255,138,0,0.4)] hover:bg-white transition-all transform hover:-translate-y-1">
              Projeyi Başlat
            </Link>
          </motion.div>
          
        </motion.div>
      </section>

    </div>
  );
}