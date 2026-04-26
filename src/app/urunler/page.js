// Dosya: src/app/urunler/page.js
'use client'; 
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Urunler() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Ürünler çekilemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🌟 YENİ NESİL ZEKİ FİLTRELEME 🌟
  // Veritabanındaki ürünlerin kategorilerini tarar, tekrarlayanları siler ve butonları oluşturur.
  const dynamicCategories = ['Tümü', ...new Set(products.map(item => item.category))];

  // Seçili kategoriye göre ürünleri filtrele
  const filteredProducts = selectedCategory === 'Tümü' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#FF8A00] selection:text-black cursor-none font-sans overflow-x-hidden">
      
      {/* İMLEÇ */}
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
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* HERO */}
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
      <div className="sticky top-[80px] md:top-[96px] z-40 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 py-4">
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

      {/* ÜRÜN VİTRİNİ */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[50vh]">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <p className="text-gray-500 font-bold text-xs tracking-widest uppercase">
            <span className="text-[#FF8A00] text-lg mr-2">{filteredProducts.length}</span> Ürün Bulundu
          </p>
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
                  className="group flex flex-col bg-[#0a0a0a] rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#FF8A00]/40 transition-colors shadow-lg"
                  onMouseEnter={() => setIsHovering(true)} 
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#111]">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${product.image}')` }}
                    ></div>
                    
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                    
                    {product.tag && (
                      <span className="absolute top-4 left-4 bg-[#FF8A00]/20 backdrop-blur-md border border-[#FF8A00]/50 text-[#FF8A00] px-3 py-1 rounded-full text-[9px] font-black tracking-widest z-10">
                        {product.tag}
                      </span>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <div className="w-12 h-12 rounded-full bg-[#FF8A00] flex items-center justify-center text-black font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_0_20px_rgba(255,138,0,0.5)]">
                         +
                       </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow relative">
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#FF8A00] transition-all duration-500 group-hover:w-full"></div>
                    
                    <span className="text-gray-500 text-[10px] font-black tracking-widest uppercase mb-2">{product.category}</span>
                    <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#FF8A00] transition-colors">{product.name}</h3>
                    <p className="text-gray-400 text-xs font-light mb-4">Renk: <span className="text-white font-bold">{product.color}</span></p>
                    
                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                      <Link href="/iletisim" className="text-xs font-bold text-gray-400 group-hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                        Numune İste <span className="text-[#FF8A00] group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 md:py-40 border-t border-white/5 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] sm:text-[20rem] md:text-[35rem] font-black text-[#FF8A00]/5 select-none pointer-events-none tracking-tighter leading-none w-full text-center">GC.</div>
        
        <div className="relative z-10 px-4 w-full">
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter">İz Bırakmaya <br/> Hazır Mısınız?</h2>
          <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Link href="/iletisim" className="inline-block px-10 md:px-14 py-5 md:py-6 bg-[#FF8A00] text-black rounded-full font-black text-xs md:text-sm tracking-[0.3em] uppercase shadow-[0_0_40px_rgba(255,138,0,0.4)] hover:shadow-[0_0_60px_rgba(255,138,0,0.6)] hover:bg-white transition-all transform hover:-translate-y-2">
              Projeyi Başlat
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}