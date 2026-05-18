// Dosya: src/app/urunler/page.js
'use client'; 
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Urunler() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Ürünler çekilemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const dynamicCategories = ['Tümü', ...new Set(products.map(item => item.category))];
  const filteredProducts = (selectedCategory === 'Tümü' ? products : products.filter(p => p.category === selectedCategory))
    .slice()
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'az') return a.name.localeCompare(b.name, 'tr');
      if (sortBy === 'za') return b.name.localeCompare(a.name, 'tr');
      return 0;
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProduct]);

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#FF8A00] selection:text-black font-sans overflow-x-hidden">

      <style dangerouslySetInnerHTML={{__html: `
        .text-outline { color: transparent; -webkit-text-stroke: 1px rgba(255,138,0,0.8); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* HERO BÖLÜMÜ */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5 flex items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558717738-0b9fbb9b68ce?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-luminosity"
        ></motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <motion.span 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-[#FF8A00] font-black tracking-[0.4em] text-xs uppercase mb-4 md:mb-6 block"
          >Koleksiyon Odası</motion.span>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-5xl md:text-8xl font-black mb-4 md:mb-6 tracking-tighter uppercase leading-[0.9] text-white"
          >
            Tüm <span className="text-outline">Seçenekler.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide"
          >
            Binlerce renk, onlarca farklı uç materyali ve sınırsız tasarım özgürlüğü. Markanıza en uygun dokunuşu bulun.
          </motion.p>
        </div>
      </section>

      {/* DİNAMİK KATEGORİ FİLTRELERİ */}
      <div className="sticky top-16 md:top-24 z-40 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 md:justify-center w-max mx-auto pb-1">
            {!isLoading && dynamicCategories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap 
                  ${selectedCategory === cat 
                    ? 'bg-[#FF8A00] text-black shadow-[0_0_15px_rgba(255,138,0,0.4)]' 
                    : 'text-gray-400 hover:text-white border border-transparent hover:border-white/20'}`}
                onMouseEnter={() => setIsHovering(true)} 
                onMouseLeave={() => setIsHovering(false)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ÜRÜN LİSTESİ */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[50vh]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <p className="text-gray-500 font-bold text-xs tracking-widest uppercase">
            <span className="text-[#FF8A00] text-lg mr-2">{filteredProducts.length}</span> Ürün Bulundu
          </p>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-400 focus:border-[#FF8A00] outline-none transition-all font-bold tracking-widest uppercase cursor-pointer"
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <div className="w-12 h-12 border-4 border-[#FF8A00]/20 border-t-[#FF8A00] rounded-full animate-spin mb-4"></div>
             <p className="text-[#FF8A00] font-black tracking-widest uppercase text-xs">Koleksiyon Yükleniyor...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 border border-white/5 rounded-[2rem] bg-[#111]/30"
          >
            <span className="text-6xl mb-6 block opacity-20">🧵</span>
            <h3 className="text-2xl font-black text-white mb-2">Vitrin Şu An Boş</h3>
            <p className="text-gray-500">Yönetici paneli üzerinden ürün eklendiğinde burada görünecektir.</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  variants={itemVariants}
                  key={product._id} 
                  className="group flex flex-col rounded-[2rem] overflow-hidden border border-white/10 hover:border-[#FF8A00]/50 transition-all shadow-lg cursor-pointer bg-[#0a0a0a]"
                  onMouseEnter={() => setIsHovering(true)} 
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={() => setSelectedProduct(product)} 
                >
                  
                  {/* 🌟 YENİ MİMARİ: TAM KAPSAMLI (COVER) GÖRSEL ALANI 🌟 */}
                  <div className="relative w-full aspect-square bg-[#050505] overflow-hidden border-b border-white/5">
                    
                    {/* bg-contain yerine bg-cover kullanıldı. Boşluklar yok edildi! */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${product.image}')` }}
                    ></div>
                    
                    {/* Siyah tema ile uyum için varsayılan hafif karanlık filtre, hoverda kalkar */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-500 pointer-events-none"></div>
                    
                    {product.tag && (
                      <span className="absolute top-4 left-4 bg-[#FF8A00] text-black px-3 py-1 rounded-full text-[9px] font-black tracking-widest z-10 shadow-md">
                        {product.tag}
                      </span>
                    )}

                    {/* Artı İkonu */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <div className="w-12 h-12 rounded-full bg-[#FF8A00] flex items-center justify-center text-black font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_0_20px_rgba(255,138,0,0.5)]">
                         +
                       </div>
                    </div>
                  </div>

                  {/* KARTIN ALT YARISI (Yazı Alanı) */}
                  <div className="p-6 flex flex-col flex-grow relative bg-[#0a0a0a]">
                    <span className="text-gray-500 text-[10px] font-black tracking-widest uppercase mb-2">{product.category}</span>
                    <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#FF8A00] transition-colors">{product.name}</h3>
                    
                    <p className="text-gray-400 text-xs font-light mb-4 line-clamp-2">
                      {product.description || "Bu ürün için henüz bir açıklama girilmemiş."}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                        Detayları İncele <span className="text-[#FF8A00] group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* POP-UP (MODAL) BÖLÜMÜ */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)} 
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-5xl bg-[#0a0a0a] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.8)] relative max-h-[90vh] md:max-h-[80vh]"
              onClick={(e) => e.stopPropagation()} 
              onMouseEnter={() => setIsHovering(true)} 
              onMouseLeave={() => setIsHovering(false)}
            >
              
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 bg-black/20 hover:bg-[#FF8A00] text-white hover:text-black rounded-full flex items-center justify-center transition-colors border border-white/10 backdrop-blur-md"
              >
                ✕
              </button>

              {/* 🌟 YENİ MİMARİ: POP-UP SOL YARISI (Tam Kapsamlı Görsel) 🌟 */}
              <div className="w-full md:w-1/2 aspect-square relative bg-[#050505] flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${selectedProduct.image}')` }}
                ></div>
                {/* Çok hafif karanlık filtre, resmin çok parlamasını engeller */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
              </div>

              {/* SAĞ Taraf: Lüks Açıklamalar */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="bg-[#FF8A00]/20 text-[#FF8A00] border border-[#FF8A00]/30 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase">
                    {selectedProduct.category}
                  </span>
                  {selectedProduct.tag && (
                    <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase">
                      {selectedProduct.tag}
                    </span>
                  )}
                  {selectedProduct.code && (
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase">
                      # {selectedProduct.code}
                    </span>
                  )}
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                  {selectedProduct.name}
                </h2>

                <div className="w-12 h-1 bg-[#FF8A00] mb-6"></div>

                <p className="text-gray-400 text-sm leading-relaxed font-light mb-10 whitespace-pre-wrap">
                  {selectedProduct.description || "Bu tasarım için özel üretim detayları ve numune süreçleri hakkında bilgi almak için bizimle iletişime geçebilirsiniz."}
                </p>

                <div className="mt-auto">
                  <Link 
                    href="/iletisim"
                    className="inline-block w-full text-center px-8 py-4 bg-white text-black rounded-full font-black text-[10px] tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,138,0,0.4)] hover:bg-[#FF8A00] transition-all"
                  >
                    Numune & Üretim Talebi
                  </Link>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KAPANIŞ CTA */}
      <section className="relative py-16 md:py-24 border-t border-white/5 flex items-center justify-center bg-[#050505] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[15rem] font-black text-[#FF8A00]/[0.03] select-none pointer-events-none tracking-tighter leading-none w-full text-center">GC.</div>
        
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={staggerContainer} 
          className="relative z-10 px-6 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
        >
          <div className="text-center md:text-left">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              İz Bırakmaya Hazır Mıyız?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-xs tracking-widest uppercase mt-3 font-bold">
              Projeniz için üretim detaylarını konuşalım.
            </motion.p>
          </div>
          
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