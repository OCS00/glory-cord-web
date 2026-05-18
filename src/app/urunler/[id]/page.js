// Dosya: src/app/urunler/[id]/page.js
'use client';
import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function UrunDetay({ params }) {
  const router = useRouter();
  
  // Next.js 16'da dinamik URL parametreleri bir Promise (söz) olarak gelir. 
  // 'use' kancası ile bu paketi açıp 'id' değerini alıyoruz.
  const { id } = use(params);

  // --- DURUM YÖNETİMİ ---
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- VERİ ÇEKME ---
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        
        if (data.success) {
          setProduct(data.product);
        } else {
          // Eğer ürün bulunamazsa veya silinmişse kullanıcıyı vitrine geri gönderiyoruz
          router.push('/urunler'); 
        }
      } catch (error) {
        console.error("Detay çekilemedi:", error);
        router.push('/urunler');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id, router]);

  // --- ANİMASYONLAR ---
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  // Veri gelene kadar zarif bir yükleme ekranı gösteriyoruz
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#FF8A00]/20 border-t-[#FF8A00] rounded-full animate-spin mb-4"></div>
        <p className="text-[#FF8A00] font-black tracking-widest uppercase text-xs">Detaylar İşleniyor...</p>
      </div>
    );
  }

  // Güvenlik: Ürün yoksa boş sayfa döndür (Zaten useEffect geri yönlendirecek)
  if (!product) return null;

  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-[#FF8A00] selection:text-black font-sans overflow-hidden">
      
      {/* 🌟 1. ARKA PLAN: SİNEMATİK TAM EKRAN GÖRSEL 🌟 */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('${product.image}')` }}
        ></div>
        {/* Yazıların okunabilmesi için alttan yukarıya doğru siyah bir geçiş (Gradient) uyguluyoruz */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-black/40"></div>
      </div>

      {/* 🌟 2. GERİ DÖN BUTONU 🌟 */}
      <div className="absolute top-24 md:top-32 left-4 md:left-12 z-20">
        <Link 
          href="/urunler" 
          className="flex items-center gap-2 text-gray-300 hover:text-[#FF8A00] transition-colors text-[10px] font-black tracking-widest uppercase bg-black/40 px-5 py-3 rounded-full backdrop-blur-md border border-white/10"
        >
          ← Vitrine Dön
        </Link>
      </div>

      {/* 🌟 3. İÇERİK: LÜKS CAM EFEKTİ KUTUSU 🌟 */}
      <div className="relative z-10 min-h-screen flex items-end md:items-center justify-center px-4 pb-24 md:pb-0 pt-40 md:pt-0">
        <motion.div
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="w-full max-w-4xl bg-black/40 backdrop-blur-2xl border border-white/10 p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        >
          {/* Kategori ve Etiketler */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#FF8A00]/20 text-[#FF8A00] border border-[#FF8A00]/30 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
              {product.category}
            </span>
            {product.tag && (
              <span className="bg-white/10 text-white border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">
                {product.tag}
              </span>
            )}
          </motion.div>

          {/* Ürün Adı */}
          <motion.h1 variants={fadeUp} className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-tight uppercase">
            {product.name}
          </motion.h1>

          {/* Uzun Ürün Açıklaması */}
          <motion.p variants={fadeUp} className="text-gray-300 text-sm md:text-base leading-relaxed font-light mb-10 max-w-3xl whitespace-pre-wrap">
            {product.description}
          </motion.p>

          {/* Aksiyon Butonu */}
          <motion.div variants={fadeUp}>
            <Link 
              href="/iletisim" 
              className="inline-block px-10 py-5 bg-[#FF8A00] text-black rounded-full font-black text-[10px] tracking-[0.3em] uppercase shadow-[0_0_30px_rgba(255,138,0,0.3)] hover:shadow-[0_0_50px_rgba(255,138,0,0.5)] hover:bg-white transition-all text-center transform hover:-translate-y-1"
            >
              Üretimi Konuşalım
            </Link>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}