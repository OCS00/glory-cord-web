// Dosya: src/app/iletisim/page.js
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Iletisim() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  // Özel İmleç
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Form Gönderme Simülasyonu
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus(''), 5000);
    }, 1500);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#FF8A00] selection:text-black cursor-none font-sans overflow-x-hidden pt-32 pb-20">
      
      {/* İMLEÇ */}
      <div className="fixed top-0 left-0 w-2 h-2 bg-[#FF8A00] rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block" style={{ transform: `translate3d(${mousePos.x - 4}px, ${mousePos.y - 4}px, 0)` }}></div>
      <div className={`fixed top-0 left-0 w-10 h-10 border border-[#FF8A00]/50 rounded-full pointer-events-none z-[99] transition-all duration-300 ease-out hidden md:block ${isHovering ? 'scale-[2.5] bg-[#FF8A00]/10 border-[#FF8A00]' : 'scale-100'}`} style={{ transform: `translate3d(${mousePos.x - 20}px, ${mousePos.y - 20}px, 0)` }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ÜST BAŞLIK */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center mb-20">
          {/* İŞTE BURAYI DÜZELTTİK: motion.span ile açıp motion.span ile kapattık */}
          <motion.span variants={fadeUp} className="text-[#FF8A00] font-black tracking-[0.4em] text-xs uppercase mb-4 block">
            Bize Ulaşın
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
            Projeyi <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,138,0,0.8)' }}>Başlat.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Koleksiyonunuz için numune talebinde bulunun veya özel üretim detaylarını konuşmak için tasarım ekibimizle iletişime geçin.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* SOL: GERÇEK İLETİŞİM BİLGİLERİ KARTLARI */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="lg:col-span-5 flex flex-col gap-6">
            
            <motion.div variants={fadeUp} className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5 hover:border-[#FF8A00]/40 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FF8A00]/10 rounded-full blur-3xl group-hover:bg-[#FF8A00]/20 transition-all duration-500"></div>
              <div className="w-14 h-14 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center text-[#FF8A00] text-xl mb-6">📍</div>
              <h3 className="text-2xl font-black text-white mb-2">Genel Merkez & Fabrika</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                Menderes Mah. 15 Temmuz <br/> Şehitler Ve Gaziler Cad.<br/> No: 1/4 Kahta / Adıyaman
              </p>
              <a href="https://maps.google.com/?q=Menderes+Mah.+15+Temmuz+Şehitler+Ve+Gaziler+Cad.+No:+1/4+Kahta+/+Adıyaman" target="_blank" rel="noopener noreferrer" className="text-[#FF8A00] font-bold text-xs uppercase tracking-widest border-b border-[#FF8A00] pb-1 hover:text-white hover:border-white transition-colors w-max" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                Haritada Gör →
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Telefon Kartı */}
              <div className="bg-[#111] p-8 rounded-[2rem] border border-white/5 hover:border-[#FF8A00]/40 transition-all duration-500 group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="text-[#FF8A00] text-2xl mb-4 transform group-hover:scale-110 transition-transform">📞</div>
                <h3 className="text-lg font-black text-white mb-2">Müşteri Hattı</h3>
                <a href="tel:+905318153611" className="text-gray-400 text-sm font-light hover:text-white transition-colors block">+90 (531) 815 36 11</a>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-3 border-t border-white/5 pt-3">Pzt-Cmt 09:00 - 18:00</p>
              </div>

              {/* Mail Kartı */}
              <div className="bg-[#111] p-8 rounded-[2rem] border border-white/5 hover:border-[#FF8A00]/40 transition-all duration-500 group" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <div className="text-[#FF8A00] text-2xl mb-4 transform group-hover:scale-110 transition-transform">✉️</div>
                <h3 className="text-lg font-black text-white mb-2">E-Posta</h3>
                <a href="mailto:ibrahimhalilsahin1@gmail.com" className="text-gray-400 text-xs sm:text-sm font-light hover:text-white transition-colors block break-all">ibrahimhalilsahin1@gmail.com</a>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-3 border-t border-white/5 pt-3">7/24 Online Destek</p>
              </div>

            </motion.div>

          </motion.div>

          {/* SAĞ: İLETİŞİM FORMU */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-7">
            <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-[2rem]">
              <h3 className="text-2xl font-black text-white uppercase mb-8">Mesaj Gönder</h3>
              
              {formStatus === 'success' && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-500 px-6 py-4 rounded-xl mb-8 text-xs font-black tracking-widest uppercase text-center">
                  Mesajınız başarıyla iletildi. En kısa sürede dönüş yapacağız.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Ad Soyad</label>
                    <input required type="text" className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none transition-all" placeholder="Adınız Soyadınız" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Firma Adı (Opsiyonel)</label>
                    <input type="text" className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none transition-all" placeholder="Şirketiniz Ltd." />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">E-Posta Adresi</label>
                    <input required type="email" className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none transition-all" placeholder="ornek@sirket.com" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Konu</label>
                    <select className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-sm text-gray-300 focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none transition-all">
                      <option>Numune Talebi</option>
                      <option>Özel Üretim</option>
                      <option>Fiyat Teklifi</option>
                      <option>Diğer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Mesajınız</label>
                  <textarea required rows="4" className="w-full bg-[#111] border border-white/10 rounded-xl p-4 text-sm text-white focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none transition-all resize-none" placeholder="Projenizden bahsedin..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'loading'}
                  className="w-full bg-[#FF8A00] text-black font-black text-xs tracking-[0.3em] uppercase py-5 rounded-xl hover:bg-white transition-all disabled:opacity-50 mt-4 shadow-[0_0_20px_rgba(255,138,0,0.2)] hover:shadow-[0_0_40px_rgba(255,138,0,0.5)]"
                  onMouseEnter={() => setIsHovering(true)} 
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {formStatus === 'loading' ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}