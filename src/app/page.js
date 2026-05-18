// Dosya: src/app/page.js
'use client'; 
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) setLatestProducts(data.products.slice(0, 4));
      } catch (error) {
        console.error("Ürünler çekilemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestProducts();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#FF8A00] selection:text-black font-sans overflow-x-hidden">

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowPan { 0%, 100% { transform: scale(1.05) translate(0, 0); } 50% { transform: scale(1.1) translate(-1%, 1%); } }
        @keyframes scrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-slow-pan { animation: slowPan 30s ease-in-out infinite; }
        .scroll-left { animation: scrollLeft 30s linear infinite; }
        .scroll-right { animation: scrollRight 30s linear infinite; }
        .text-outline { color: transparent; -webkit-text-stroke: 1px rgba(255,138,0,0.8); }
        .text-outline-white { color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.2); }
      `}} />

      {/* ================= 1. HERO ================= */}
      <section className="relative h-[100svh] flex items-center justify-center overflow-hidden w-full border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558717738-0b9fbb9b68ce?auto=format&fit=crop&w=2070&q=80')] bg-cover animate-slow-pan opacity-30 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050505_90%)]"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-[#FF8A00] opacity-10 rounded-full blur-[150px] pointer-events-none"></div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-center mt-20">
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-[#FF8A00]"></div>
            <span className="text-[#FF8A00] text-xs font-black tracking-[0.4em] uppercase">Premium Üretim</span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-6xl md:text-[8rem] font-black text-white mb-6 tracking-tighter leading-[0.9] uppercase">
            İpliğin <br/><span className="text-outline">Sanatı.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 max-w-xl font-light tracking-wide mb-12 border-l-2 border-[#FF8A00] pl-6">
            Dünyaca ünlü markaların tekstil koleksiyonlarını tamamlayan, milimetrik hassasiyetle dokunmuş kordon ve kordon ucu çözümleri.
          </motion.p>
          
          <motion.div variants={fadeUp}>
            <Link href="/urunler" className="group relative inline-flex items-center gap-6 px-10 py-5 bg-transparent border border-white/20 overflow-hidden rounded-full transition-all hover:border-[#FF8A00]">
              <span className="absolute inset-0 w-0 bg-[#FF8A00] transition-all duration-500 ease-out group-hover:w-full"></span>
              <span className="relative z-10 text-white group-hover:text-black font-black text-xs uppercase tracking-[0.3em] transition-colors">Koleksiyonu İncele</span>
              <span className="relative z-10 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transform group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= 2. İSTATİSTİK HATTI (YENİ) ================= */}
      <section className="relative z-20 bg-[#0a0a0a] border-b border-white/5 py-12 md:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {[
              { num: '2Milyon+', text: 'Aylık Metre Üretim' },
              { num: '100+', text: 'Farklı Ürün Türü' },
              { num: '%100', text: 'Özelleştirme İmkanı' },
              { num: '0', text: 'Hata Toleransı' }
            ].map((stat, index) => (
              <motion.div variants={fadeUp} key={index} className="py-8 md:py-16 px-4 text-center group cursor-default">
                <h3 className="text-4xl md:text-6xl font-black text-white group-hover:text-[#FF8A00] transition-colors duration-500 tracking-tighter mb-2">{stat.num}</h3>
                <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase">{stat.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 3. CANLI VİTRİN ================= */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h2 variants={fadeUp} className="text-[#FF8A00] font-black tracking-[0.3em] uppercase mb-4 text-xs">Canlı Vitrin</motion.h2>
            <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">En Yeni <span className="text-gray-600">Üretimler.</span></motion.h3>
          </div>
          <motion.div variants={fadeUp}>
            <Link href="/urunler" className="text-xs font-black tracking-[0.2em] uppercase text-gray-400 hover:text-[#FF8A00] transition-colors flex items-center gap-2">
              Kataloğun Tamamı <span className="text-xl">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-2 border-[#FF8A00]/20 border-t-[#FF8A00] rounded-full animate-spin"></div></div>
        ) : latestProducts.length === 0 ? (
          <div className="text-center py-20 border border-white/5 rounded-3xl bg-[#111]/30"><p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Yeni koleksiyon parçaları yükleniyor...</p></div>
        ) : (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProducts.map((product) => (
              <motion.div variants={fadeUp} key={product._id} className="group bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/5 hover:border-[#FF8A00]/40 transition-colors shadow-lg">
                <div className="relative h-64 w-full overflow-hidden bg-[#111]">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${product.image}')` }}></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                  {product.tag && <span className="absolute top-4 left-4 bg-[#FF8A00]/20 backdrop-blur-md border border-[#FF8A00]/50 text-[#FF8A00] px-3 py-1 rounded-full text-[9px] font-black tracking-widest z-10">{product.tag}</span>}
                </div>
                <div className="p-6 relative">
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#FF8A00] transition-all duration-500 group-hover:w-full"></div>
                  <span className="text-gray-500 text-[10px] font-black tracking-widest uppercase mb-2 block">{product.category}</span>
                  <h4 className="text-lg font-black text-white mb-1 truncate">{product.name}</h4>
                  <p className="text-gray-400 text-xs font-light line-clamp-2">{product.description || 'Detaylar için tıklayın.'}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ================= 4. SÜRDÜRÜLEBİLİRLİK (YENİ) ================= */}
      <section className="relative py-24 md:py-32 border-y border-white/5 overflow-hidden bg-[#020202]">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1621456950334-fb3170b925b2?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity grayscale mask-image-gradient hidden md:block"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-2xl">
            <motion.h2 variants={fadeUp} className="text-green-500 font-black tracking-[0.3em] uppercase mb-4 text-xs">Ekolojik Vizyon</motion.h2>
            <motion.h3 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 uppercase">Yarına Kalan <br/><span className="text-outline-white">Tek İzimiz.</span></motion.h3>
            <motion.p variants={fadeUp} className="text-gray-400 text-sm leading-relaxed font-light mb-10">
              Sadece estetiği değil, gezegenimizi de düşünüyoruz. Geri dönüştürülmüş PET şişelerden elde edilen özel polyester ipliklerimiz ve su tasarrufu sağlayan Oeko-Tex sertifikalı boyama tesisimizle, lüksü doğayla barıştırıyoruz.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-8 border-t border-white/10 pt-8">
              <div>
                <h4 className="text-3xl font-black text-white mb-1">%40</h4>
                <p className="text-gray-500 text-[9px] font-bold tracking-widest uppercase">Su Tasarrufu</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-white mb-1">100+</h4>
                <p className="text-gray-500 text-[9px] font-bold tracking-widest uppercase">Geri Dönüşüm Ürünü</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= 5. HAMMADDE MATRİSİ (YENİ) ================= */}
      <section className="py-24 md:py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-[#FF8A00] font-black tracking-[0.3em] uppercase mb-4 text-xs">Materyal Kütüphanesi</motion.h2>
            <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Dokunun Gücü.</motion.h3>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Doğal Pamuk", desc: "Nefes alabilen, yumuşak ve mat bitişli premium pamuk iplikler.", img: "https://images.unsplash.com/photo-1605280263929-1c42c62ef169?auto=format&fit=crop&w=800&q=80" },
              { title: "Parlak Lurex (Sim)", desc: "Abiye ve lüks tasarımlar için metalik yansımalı özel simli dokumalar.", img: "https://images.unsplash.com/photo-1616080496155-256d059e0a29?auto=format&fit=crop&w=800&q=80" },
              { title: "Dayanıklı Polyester", desc: "Yüksek kopma direncine sahip, parlak ve endüstriyel standartta iplikler.", img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80" }
            ].map((mat, idx) => (
              <motion.div variants={fadeUp} key={idx} className="group relative h-80 rounded-3xl overflow-hidden cursor-none">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" style={{ backgroundImage: `url('${mat.img}')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <h4 className="text-2xl font-black text-white mb-2">{mat.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">{mat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 6. METODOLOJİ ================= */}
      <section className="py-24 bg-[#0a0a0a] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-[#FF8A00] font-black tracking-[0.3em] uppercase mb-4 text-xs">Süreç</motion.h2>
            <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-black text-white tracking-tighter">4 ADIMDA <span className="text-gray-600">KUSURSUZLUK</span></motion.h3>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'Tasarım & Analiz', desc: 'Pantone kodları alınır, materyal mühendisliği yapılır.' },
              { num: '02', title: 'Laboratuvar', desc: 'Boya haslık testleri ve lazer kalıp çizimleri tamamlanır.' },
              { num: '03', title: 'Seri Üretim', desc: 'Tam otomatik Alman parkurunda milimetrik dokuma başlar.' },
              { num: '04', title: 'Kalite & Sevk', desc: 'Gerilim testlerinden geçen ürünler, kusursuzca teslim edilir.' }
            ].map((step, index) => (
              <motion.div variants={fadeUp} key={index} className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-[#FF8A00]/50 transition-all duration-300 group">
                <div className="text-5xl font-black text-white/5 mb-6 group-hover:text-[#FF8A00] transition-colors duration-500">{step.num}</div>
                <h4 className="text-lg font-black text-white mb-3">{step.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed font-light">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 7. KAYAN BANT (MARQUEE) ================= */}
      <div className="w-full bg-[#111] py-6 overflow-hidden relative z-20 border-b border-white/5 flex flex-col gap-4">
        <div className="flex whitespace-nowrap scroll-left w-max">
          <div className="flex gap-8 px-4 items-center">
            <span className="text-white/20 font-black text-2xl tracking-widest uppercase">✦ DOKUMA ✦ LAZER KESİM ✦ SİLİKON KAPLAMA ✦ ÖZEL KALIP ✦ METAL UÇ</span>
            <span className="text-white/20 font-black text-2xl tracking-widest uppercase">✦ DOKUMA ✦ LAZER KESİM ✦ SİLİKON KAPLAMA ✦ ÖZEL KALIP ✦ METAL UÇ</span>
          </div>
        </div>
      </div>

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
          <motion.div variants={fadeUp} className="flex-shrink-0">
            <Link href="/iletisim" className="inline-block px-8 py-4 bg-[#FF8A00] text-black rounded-full font-black text-[10px] md:text-xs tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(255,138,0,0.2)] hover:shadow-[0_0_40px_rgba(255,138,0,0.4)] hover:bg-white transition-all transform hover:-translate-y-1">
              Projeyi Başlat
            </Link>
          </motion.div>
          
        </motion.div>
      </section>

    </div>
  );
}