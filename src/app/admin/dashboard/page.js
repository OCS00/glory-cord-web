// Dosya: src/app/admin/dashboard/page.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Form Stateleri
  const [formData, setFormData] = useState({
    name: '',
    category: 'Metal Uç',
    color: '',
    tag: '',
    image: ''
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  // Sayfa açıldığında ürünleri çek
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Ürünler çekilemedi:", error);
    }
  };

  // 🌟 GERÇEK CLOUDINARY RESİM YÜKLEME 🌟
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setMessage({ text: 'Görsel buluta fırlatılıyor...', type: 'loading' });

    // Cloudinary ayarları
    const CLOUD_NAME = 'dkt0xqpv3'; // Buraya kendi Cloud Name'ini yaz
    const UPLOAD_PRESET = 'glory_resimler'; // Buraya Upload Preset adını yaz (Örn: glory_resimler)

    const imageFormData = new FormData();
    imageFormData.append('file', file);
    imageFormData.append('upload_preset', UPLOAD_PRESET);
    imageFormData.append('cloud_name', CLOUD_NAME);

    try {
      // Cloudinary'nin gerçek API'sine resmi gönderiyoruz
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: imageFormData,
      });

      const uploadedImageData = await response.json();

      // Cloudinary bize resmin sonsuza dek saklanacağı güvenli linki (secure_url) veriyor!
      if (uploadedImageData.secure_url) {
        setFormData({ ...formData, image: uploadedImageData.secure_url });
        setMessage({ text: 'Görsel buluta başarıyla yüklendi!', type: 'success' });
      } else {
        setMessage({ text: 'Görsel yüklenirken bir hata oluştu.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Bulut sunucusuna bağlanılamadı!', type: 'error' });
    } finally {
      setUploadingImage(false);
    }
  };

  // Yeni Ürün Ekleme
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setMessage({ text: 'Lütfen bir ürün görseli yükleyin!', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: 'Ürün vitrine ekleniyor...', type: 'loading' });

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ text: 'Ürün başarıyla vitrine eklendi!', type: 'success' });
        setFormData({ name: '', category: 'Metal Uç', color: '', tag: '', image: '' });
        fetchProducts(); // Listeyi güncelle
      } else {
        setMessage({ text: 'Hata: ' + data.error, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Bir şeyler ters gitti.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // 🌟 YENİ: ÜRÜN SİLME FONKSİYONU 🌟
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Bu ürünü vitrinden kalıcı olarak silmek istediğinize emin misiniz?');
    if (!isConfirmed) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      
      const data = await res.json();
      if (data.success) {
        setMessage({ text: 'Ürün vitrinden silindi!', type: 'success' });
        fetchProducts(); // Listeyi güncelle
      } else {
        setMessage({ text: 'Silme işlemi başarısız!', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Silme sırasında hata oluştu.', type: 'error' });
    }
  };

  const handleLogout = () => {
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF8A00] selection:text-black pb-20">
      
      {/* ÜST BAR (NAVBAR) */}
      <nav className="bg-[#111] border-b border-white/5 px-6 py-4 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#FF8A00]/10 border border-[#FF8A00]/30 rounded-xl flex items-center justify-center text-[#FF8A00] font-black text-xl">GC</div>
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
              <span className="text-[#FF8A00]">✦</span> Yeni Ürün Ekle
            </h2>

            {message.text && (
              <div className={`p-4 rounded-xl mb-6 text-xs font-bold tracking-widest uppercase text-center 
                ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/30' : 
                  message.type === 'loading' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/30' : 
                  'bg-red-500/10 text-red-500 border border-red-500/30'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* DOSYA YÜKLEME ALANI */}
              <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-6 text-center hover:border-[#FF8A00] transition-colors group cursor-pointer bg-[#050505]">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="text-3xl group-hover:text-[#FF8A00] transition-colors">📸</span>
                  <p className="text-xs font-bold text-gray-400 tracking-widest uppercase group-hover:text-white transition-colors">
                    {uploadingImage ? 'Yükleniyor...' : formData.image ? 'Görsel Seçildi! Değiştir' : 'Görsel Seç veya Sürükle'}
                  </p>
                </div>
                {/* Seçilen Görselin Önizlemesi */}
                {formData.image && (
                  <div className="absolute inset-0 z-0 opacity-40 bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(${formData.image})` }}></div>
                )}
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
                  <option value="Doğal">Doğal İplik</option>
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

              <button disabled={isLoading || uploadingImage} type="submit" className="w-full mt-4 bg-[#FF8A00] text-black font-black text-xs tracking-[0.2em] uppercase py-4 rounded-xl hover:bg-white transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(255,138,0,0.2)] hover:shadow-[0_0_40px_rgba(255,138,0,0.5)]">
                {isLoading ? 'Yükleniyor...' : 'Kataloğa Ekle'}
              </button>
            </form>
          </div>
        </div>

        {/* SAĞ: MEVCUT ÜRÜNLER LİSTESİ */}
        <div className="lg:col-span-8">
          <div className="bg-[#111]/30 border border-white/5 rounded-3xl p-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-black mb-1 flex items-center gap-3">Yayındaki Ürünler</h2>
                <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">Vitrin canlı olarak güncellenmektedir.</p>
              </div>
              <div className="px-4 py-2 bg-[#FF8A00]/10 text-[#FF8A00] border border-[#FF8A00]/30 rounded-lg text-xs font-black tracking-widest">
                TOPLAM: {products.length}
              </div>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                <span className="text-4xl mb-4 block opacity-50">📦</span>
                <p className="text-gray-500 font-medium">Henüz ürün eklenmemiş.</p>
                <p className="text-gray-600 text-xs mt-2">Sol taraftaki formu kullanarak ilk kordonunuzu vitrine ekleyin.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="bg-[#050505] border border-white/5 rounded-2xl overflow-hidden flex group hover:border-[#FF8A00]/30 transition-all relative">
                    
                    {/* 🌟 YENİ: SİLME BUTONU 🌟 */}
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 shadow-lg"
                      title="Ürünü Sil"
                    >
                      ✕
                    </button>

                    <div className="w-1/3 h-32 bg-gray-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url('${product.image}')` }}></div>
                    </div>
                    <div className="w-2/3 p-4 flex flex-col justify-center relative">
                      {product.tag && (
                        <span className="absolute bottom-4 right-4 text-[8px] font-black tracking-widest uppercase text-[#FF8A00] bg-[#FF8A00]/10 px-2 py-1 rounded">
                          {product.tag}
                        </span>
                      )}
                      <span className="text-gray-500 text-[10px] font-black tracking-widest uppercase mb-1">{product.category}</span>
                      <h3 className="text-white font-bold text-sm mb-2 leading-tight">{product.name}</h3>
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