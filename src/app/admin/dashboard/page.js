// Dosya: src/app/admin/dashboard/page.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWR from 'swr'; // Yenilikçi veri çekme kütüphanesi
import toast, { Toaster } from 'react-hot-toast'; // Modern bildirim sistemi

// SWR için veriyi getiren standart fetcher fonksiyonu
const fetcher = (url) => fetch(url).then((res) => res.json());


export default function Dashboard() {
  const router = useRouter();
  // (Mevcut statelerin hemen altına ekle)
  // 🌟 YENİ: Arama ve Filtreleme Stateleri
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tümü');
  
  // SWR ENTEGRASYONU: Ürünleri otomatik çeker, önbellekler ve sayfayı yenilemeden günceller.
  const { data, error, isLoading: isProductsLoading, mutate } = useSWR(
    `/api/products?search=${searchTerm}&category=${filterCategory}`, 
    fetcher
  );
  
  const products = data?.products || [];

  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form Stateleri
  const [formData, setFormData] = useState({
    name: '',
    category: 'Metal Uç',
    color: '',
    tag: '',
    image: ''
  });

  // 🌟 GERÇEK CLOUDINARY RESİM YÜKLEME 🌟
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    
    // toast.promise ile yükleme sürecini animasyonlu şık bir bildirime dönüştürüyoruz
    const uploadPromise = new Promise(async (resolve, reject) => {
      const CLOUD_NAME = 'dkt0xqpv3'; 
      const UPLOAD_PRESET = 'glory_resimler'; 

      const imageFormData = new FormData();
      imageFormData.append('file', file);
      imageFormData.append('upload_preset', UPLOAD_PRESET);
      imageFormData.append('cloud_name', CLOUD_NAME);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: imageFormData,
        });
        const uploadedImageData = await response.json();

        if (uploadedImageData.secure_url) {
          setFormData(prev => ({ ...prev, image: uploadedImageData.secure_url }));
          resolve();
        } else {
          reject('Bağlantı hatası');
        }
      } catch (err) {
        reject(err);
      } finally {
        setUploadingImage(false);
      }
    });

    toast.promise(uploadPromise, {
      loading: 'Görsel buluta fırlatılıyor...',
      success: 'Görsel başarıyla yüklendi! 📸',
      error: 'Görsel yüklenirken hata oluştu.',
    }, {
      style: { minWidth: '250px', background: '#111', color: '#fff', border: '1px solid #333' }
    });
  };

  // Yeni Ürün Ekleme (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      toast.error('Lütfen bir ürün görseli yükleyin!', { style: { background: '#111', color: '#fff' }});
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success('Ürün başarıyla vitrine eklendi! 🚀', { style: { background: '#111', color: '#fff' }});
        setFormData({ name: '', category: 'Metal Uç', color: '', tag: '', image: '' });
        // SWR'ın mutate fonksiyonu: Veritabanını yormadan ekranı anında günceller
        mutate(); 
      } else {
        toast.error('Hata: ' + result.error, { style: { background: '#111', color: '#fff' }});
      }
    } catch (error) {
      toast.error('Bir şeyler ters gitti.', { style: { background: '#111', color: '#fff' }});
    } finally {
      setIsLoading(false);
    }
  };

  // Ürün Silme (DELETE)
  const handleDelete = async (id) => {
    // Sadece tarayıcı onayı değil, özel tasarımlı toast (Bildirim) da eklenebilir ileride
    const isConfirmed = window.confirm('Bu ürünü vitrinden kalıcı olarak silmek istediğinize emin misiniz?');
    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      
      const result = await res.json();
      if (result.success) {
        toast.success('Ürün vitrinden tamamen silindi.', { style: { background: '#111', color: '#fff' }});
        mutate(); // Ekrandaki listeyi anında güncelle
      } else {
        toast.error('Silme işlemi başarısız!', { style: { background: '#111', color: '#fff' }});
      }
    } catch (error) {
      toast.error('Silme sırasında hata oluştu.', { style: { background: '#111', color: '#fff' }});
    }
  };

  const handleLogout = () => router.push('/admin');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF8A00] selection:text-black pb-20">
      
      {/* MODERN BİLDİRİM SİSTEMİ BİLEŞENİ */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* ÜST BAR (NAVBAR) */}
      <nav className="bg-[#111] border-b border-white/5 px-6 py-4 sticky top-0 z-50 flex justify-between items-center backdrop-blur-md bg-opacity-80">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#FF8A00]/10 border border-[#FF8A00]/30 rounded-xl flex items-center justify-center text-[#FF8A00] font-black text-xl shadow-[0_0_15px_rgba(255,138,0,0.2)]">GC</div>
          <h1 className="text-xl font-black tracking-widest uppercase">Komuta Merkezi</h1>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/urunler" target="_blank" className="text-gray-400 hover:text-[#FF8A00] text-xs font-bold tracking-widest uppercase transition-colors">
            Vitrine Bak ↗
          </Link>
          <button onClick={handleLogout} className="px-6 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg text-xs font-black tracking-widest uppercase transition-all">
            Güvenli Çıkış
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* SOL: ÜRÜN EKLEME FORMU */}
        <div className="lg:col-span-4">
          <div className="bg-[#111]/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl sticky top-28 shadow-2xl">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <span className="text-[#FF8A00] animate-pulse">✦</span> Yeni Ürün Ekle
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* DOSYA YÜKLEME ALANI */}
              <div className={`relative border-2 border-dashed ${formData.image ? 'border-[#FF8A00]' : 'border-white/20'} rounded-2xl p-6 text-center hover:border-[#FF8A00] transition-colors group cursor-pointer bg-[#050505] overflow-hidden`}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                
                {/* Resim Önizlemesi */}
                {formData.image && (
                  <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${formData.image})` }}>
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
                  </div>
                )}

                <div className="relative z-10 flex flex-col items-center justify-center gap-2">
                  <span className={`text-3xl transition-transform ${uploadingImage ? 'animate-bounce' : 'group-hover:scale-110'}`}>
                    {formData.image ? '✨' : '📸'}
                  </span>
                  <p className="text-xs font-bold text-gray-300 tracking-widest uppercase group-hover:text-white transition-colors">
                    {uploadingImage ? 'İşleniyor...' : formData.image ? 'Değiştirmek İçin Tıkla' : 'Görsel Seç veya Sürükle'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Ürün Adı</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none transition-all text-white" placeholder="Örn: Mat Siyah Kordon" />
              </div>
              
              <div>
                <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Kategori</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none transition-all text-gray-300">
                  <option value="Metal Uç">Metal Uç</option>
                  <option value="Silikon Uç">Silikon Uç</option>
                  <option value="Plastik Uç">Plastik Uç</option>
                  <option value="Özel Kalıp">Özel Kalıp</option>
                  <option value="Doğal İplik">Doğal İplik</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Renk</label>
                  <input required type="text" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none transition-all text-white" placeholder="Örn: Siyah" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Etiket (Opsiyonel)</label>
                  <input type="text" value={formData.tag} onChange={(e) => setFormData({...formData, tag: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none transition-all text-white" placeholder="YENİ, VIP vb." />
                </div>
              </div>

              <button disabled={isLoading || uploadingImage} type="submit" className="w-full mt-4 bg-[#FF8A00] text-black font-black text-xs tracking-[0.2em] uppercase py-4 rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,138,0,0.2)] hover:shadow-[0_0_40px_rgba(255,138,0,0.5)] active:scale-95">
                {isLoading ? 'Ekleniyor...' : 'Kataloğa Ekle'}
              </button>
            </form>
          </div>
        </div>

        {/* SAĞ: MEVCUT ÜRÜNLER LİSTESİ */}
        <div className="lg:col-span-8">
          <div className="bg-[#111]/30 border border-white/5 rounded-3xl p-8">
            
            {/* ÜST BİLGİ VE ARAMA/FİLTRE ÇUBUĞU */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 border-b border-white/5 pb-6">
              <div>
                <h2 className="text-2xl font-black mb-1 flex items-center gap-3">Yayındaki Ürünler</h2>
                <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Canlı veritabanı bağlantısı aktif.</p>
              </div>
              
              {/* YENİ: Arama ve Kategori Filtresi */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Ürün Ara..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#050505] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-[#FF8A00] outline-none transition-all w-full sm:w-48 placeholder:text-gray-600"
                />
                
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-[#050505] border border-white/10 rounded-xl px-4 py-2 text-sm text-gray-300 focus:border-[#FF8A00] outline-none transition-all w-full sm:w-40"
                >
                  <option value="Tümü">Tüm Kategoriler</option>
                  <option value="Metal Uç">Metal Uç</option>
                  <option value="Silikon Uç">Silikon Uç</option>
                  <option value="Plastik Uç">Plastik Uç</option>
                  <option value="Özel Kalıp">Özel Kalıp</option>
                  <option value="Doğal İplik">Doğal İplik</option>
                </select>

                <div className="px-4 py-2 bg-[#FF8A00]/10 text-[#FF8A00] border border-[#FF8A00]/30 rounded-xl text-xs font-black tracking-widest flex items-center justify-center shrink-0">
                  TOPLAM: {products.length}
                </div>
              </div>
            </div>

            {/* Yükleme Ekranı İskeleti (Buradan sonrası senin kodunla aynı kalacak...) */}

            {/* Yükleme Ekranı İskeleti (Skeleton) */}
            {isProductsLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[1, 2, 3, 4].map((skeleton) => (
                    <div key={skeleton} className="bg-[#050505] border border-white/5 rounded-2xl h-32 animate-pulse flex">
                      <div className="w-1/3 bg-gray-800/50"></div>
                      <div className="w-2/3 p-4 flex flex-col justify-center gap-3">
                         <div className="h-3 w-1/4 bg-gray-700 rounded"></div>
                         <div className="h-4 w-3/4 bg-gray-600 rounded"></div>
                         <div className="h-2 w-1/2 bg-gray-700 rounded mt-2"></div>
                      </div>
                    </div>
                 ))}
               </div>
            ) : error ? (
              <div className="text-center py-10 text-red-500 font-bold border border-red-500/20 rounded-2xl bg-red-500/5">
                 Ürünler sunucudan çekilirken hata oluştu.
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                <span className="text-4xl mb-4 block opacity-50 grayscale">📦</span>
                <p className="text-gray-500 font-medium">Henüz ürün eklenmemiş.</p>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-2">Sistemi başlatmak için ilk kordonunuzu ekleyin.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="bg-[#050505] border border-white/5 rounded-2xl overflow-hidden flex group hover:border-[#FF8A00]/30 transition-all relative shadow-lg hover:shadow-[0_10px_30px_rgba(255,138,0,0.1)]">
                    
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-black/80 border border-red-500/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 hover:scale-110"
                      title="Ürünü Sil"
                    >
                      ✕
                    </button>

                    <div className="w-1/3 h-32 bg-[#0a0a0a] relative overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('${product.image}')` }}></div>
                    </div>
                    <div className="w-2/3 p-4 flex flex-col justify-center relative">
                      {product.tag && (
                        <span className="absolute bottom-4 right-4 text-[8px] font-black tracking-widest uppercase text-[#FF8A00] bg-[#FF8A00]/10 px-2 py-1 rounded">
                          {product.tag}
                        </span>
                      )}
                      <span className="text-gray-500 text-[9px] font-black tracking-widest uppercase mb-1">{product.category}</span>
                      <h3 className="text-white font-bold text-sm mb-1 leading-tight">{product.name}</h3>
                      <p className="text-gray-400 text-xs">Renk: <span className="text-white">{product.color}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}