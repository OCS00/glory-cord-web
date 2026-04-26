// Dosya: src/app/admin/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Giriş Yapma Fonksiyonu (Şimdilik basit, ileride güvenlik katmanı eklenebilir)
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Şirket için geçici sabit şifre (Bunu değiştirebilirsin)
    if (username === 'glory' && password === 'cord2026') {
      // Şifre doğruysa ürün ekleme paneline (dashboard) yönlendir
      router.push('/admin/dashboard');
    } else {
      setError('Geçersiz yetki kodu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Arka Plan Efektleri */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF8A00] opacity-[0.03] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        
        {/* Admin Logosu / İkonu */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,138,0,0.1)]">
            <span className="text-[#FF8A00] text-2xl">🔒</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-widest uppercase">Sistem Erişimi</h1>
          <p className="text-gray-500 text-xs tracking-[0.3em] uppercase mt-3">Glory Cord Yönetim Paneli</p>
        </div>

        {/* Giriş Formu */}
        <div className="bg-[#111]/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Üstteki İnce Turuncu Çizgi */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent opacity-50"></div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Hata Mesajı */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
                <p className="text-red-500 text-xs font-bold tracking-widest uppercase">{error}</p>
              </div>
            )}

            <div className="group">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-[#FF8A00] transition-colors">Yetkili ID</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-white font-light tracking-wider focus:outline-none focus:border-[#FF8A00] transition-all" 
                placeholder="Kullanıcı Adı"
                required
              />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-[#FF8A00] transition-colors">Güvenlik Anahtarı</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-5 py-4 text-white font-light tracking-wider focus:outline-none focus:border-[#FF8A00] transition-all" 
                placeholder="••••••••"
                required
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-[#FF8A00] text-black font-black text-xs tracking-[0.3em] uppercase py-5 rounded-xl shadow-[0_0_20px_rgba(255,138,0,0.2)] hover:shadow-[0_0_40px_rgba(255,138,0,0.5)] hover:bg-white transition-all transform hover:-translate-y-1"
              >
                Sisteme Bağlan
              </button>
            </div>
            
          </form>
        </div>

        <p className="text-center text-gray-600 text-[9px] font-bold tracking-[0.2em] uppercase mt-10">
          * Bu alan sadece yetkili personel içindir. Tüm girişler IP bazlı kayıt altına alınmaktadır.
        </p>

      </div>
    </div>
  );
}