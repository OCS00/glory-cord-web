'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import toast, { Toaster } from 'react-hot-toast';

const fetcher = (url) => fetch(url).then((res) => res.json());

const CATEGORY_SUGGESTIONS = [
  'Metal Uçlu', 'Silikon Uçlu', 'Plastik Uçlu', 'Özel Kalıp', 'Doğal İplik',
  'Polyester Kordon', 'Pamuk Kordon', 'Yassı Kordon', 'Yuvarlak Kordon',
  'Elastik Kordon', 'Örgülü Kordon', 'Lazer Kesimli', 'Termoplastik Uçlu',
  'Deri Uçlu', 'Ahşap Uçlu', 'Çift Renk', 'Sim / Lurex', 'Baskılı Kordon',
  'Akrilik Kordon', 'Naylon Kordon',
];
const EMPTY_FORM = { name: '', code: '', category: '', description: '', tag: '', image: '' };
const TOAST_STYLE = { background: '#111', color: '#fff', border: '1px solid #222' };

function PasswordModal({ onClose }) {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' });
  const [error, setError] = useState('');

  const handleSave = () => {
    const storedPass = localStorage.getItem('gc_admin_pass') || 'cord2026';
    if (form.current !== storedPass) { setError('Mevcut şifre hatalı.'); return; }
    if (form.next.length < 6) { setError('Yeni şifre en az 6 karakter olmalı.'); return; }
    if (form.next !== form.confirm) { setError('Yeni şifreler eşleşmiyor.'); return; }
    localStorage.setItem('gc_admin_pass', form.next);
    toast.success('Şifre güncellendi!', { style: TOAST_STYLE });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-sm bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent opacity-60"></div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-black text-white tracking-tight">Şifre Değiştir</h3>
          <button onClick={onClose} className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all text-sm">✕</button>
        </div>
        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] font-black tracking-widest uppercase">{error}</div>}
        <div className="space-y-4">
          {[
            { label: 'Mevcut Şifre', key: 'current' },
            { label: 'Yeni Şifre', key: 'next' },
            { label: 'Yeni Şifre (Tekrar)', key: 'confirm' },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">{label}</label>
              <input
                type="password"
                value={form[key]}
                onChange={e => { setForm(p => ({ ...p, [key]: e.target.value })); setError(''); }}
                className="w-full bg-[#080808] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none text-white transition-all"
                placeholder="••••••••"
              />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-3 border border-white/10 text-gray-400 hover:text-white rounded-xl text-xs font-black tracking-widest uppercase transition-all">İptal</button>
            <button onClick={handleSave} className="flex-1 py-3 bg-[#FF8A00] hover:bg-white text-black rounded-xl text-xs font-black tracking-widest uppercase transition-all">Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ product, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-sm bg-[#111] border border-red-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60"></div>
        <div className="w-14 h-14 mx-auto mb-5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center text-2xl">🗑️</div>
        <h3 className="text-xl font-black text-white text-center mb-2 tracking-tight">Ürünü Sil</h3>
        <p className="text-gray-400 text-xs text-center mb-1 tracking-widest uppercase font-bold">{product?.name}</p>
        <p className="text-gray-600 text-[10px] text-center mb-8">Bu işlem geri alınamaz. Ürün vitrinden kalıcı olarak silinecektir.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 border border-white/10 text-gray-400 hover:text-white rounded-xl text-xs font-black tracking-widest uppercase transition-all hover:border-white/30">
            Vazgeç
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-red-500 hover:bg-red-400 text-white rounded-xl text-xs font-black tracking-widest uppercase transition-all">
            Kalıcı Sil
          </button>
        </div>
      </div>
    </div>
  );
}

function EditModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({ ...product });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const uploadPromise = new Promise(async (resolve, reject) => {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', 'glory_resimler');
      fd.append('cloud_name', 'dkt0xqpv3');
      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dkt0xqpv3/image/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (data.secure_url) { setForm(p => ({ ...p, image: data.secure_url })); resolve(); }
        else reject('Yükleme hatası.');
      } catch (err) { reject(err); }
      finally { setUploadingImage(false); }
    });
    toast.promise(uploadPromise, { loading: 'Görsel yükleniyor...', success: 'Görsel güncellendi!', error: 'Hata oluştu.' }, { style: TOAST_STYLE });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) { toast.success('Ürün güncellendi!', { style: TOAST_STYLE }); onSave(); onClose(); }
      else toast.error(result.error, { style: TOAST_STYLE });
    } catch { toast.error('Güncelleme başarısız.', { style: TOAST_STYLE }); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent opacity-60"></div>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-white tracking-tight">Ürünü Düzenle</h3>
            <button onClick={onClose} className="w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all">✕</button>
          </div>

          <div className="space-y-5">
            <div className={`relative border-2 border-dashed ${form.image ? 'border-[#FF8A00]' : 'border-white/20'} rounded-2xl overflow-hidden group cursor-pointer`} style={{ minHeight: '120px' }}>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
              {form.image && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${form.image})` }}><div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div></div>}
              <div className="relative z-10 flex flex-col items-center justify-center gap-2 py-8">
                <span className="text-2xl">{form.image ? '📸' : '☁️'}</span>
                <p className="text-xs font-bold text-gray-300 tracking-widest uppercase">{uploadingImage ? 'İşleniyor...' : form.image ? 'Değiştirmek İçin Tıkla' : 'Yeni Görsel Seç'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Ürün Adı</label>
                <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none text-white" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Ürün Kodu <span className="text-gray-700">(Ops.)</span></label>
                <input type="text" value={form.code || ''} onChange={e => setForm(p => ({ ...p, code: e.target.value }))} className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none text-white" placeholder="GC-001" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Kategori</label>
              <input
                type="text"
                list="cat-suggestions-edit"
                value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none text-white"
                placeholder="Kategori yazın veya listeden seçin..."
              />
              <datalist id="cat-suggestions-edit">
                {CATEGORY_SUGGESTIONS.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Açıklama</label>
              <textarea rows="3" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none text-white resize-none" />
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Etiket (Opsiyonel)</label>
              <input type="text" value={form.tag} onChange={e => setForm(p => ({ ...p, tag: e.target.value }))} className="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none text-white" placeholder="YENİ, VIP vb." />
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="flex-1 py-3 border border-white/10 text-gray-400 hover:text-white rounded-xl text-xs font-black tracking-widest uppercase transition-all">İptal</button>
              <button onClick={handleSave} disabled={saving || uploadingImage} className="flex-1 py-3 bg-[#FF8A00] hover:bg-white text-black rounded-xl text-xs font-black tracking-widest uppercase transition-all disabled:opacity-50">
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tümü');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activeView, setActiveView] = useState('products');

  const { data, error, isLoading: isProductsLoading, mutate } = useSWR(
    `/api/products?search=${searchTerm}&category=${filterCategory}`,
    fetcher
  );
  const { data: allData } = useSWR('/api/products', fetcher);

  const products = data?.products || [];
  const allProducts = allData?.products || [];

  const uniqueCategories = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
  const stats = {
    total: allProducts.length,
    byCategory: uniqueCategories.map(cat => ({
      name: cat,
      count: allProducts.filter(p => p.category === cat).length,
      short: cat.split(' ')[0],
    })),
    tagged: allProducts.filter(p => p.tag).length,
    coded: allProducts.filter(p => p.code).length,
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const uploadPromise = new Promise(async (resolve, reject) => {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', 'glory_resimler');
      fd.append('cloud_name', 'dkt0xqpv3');
      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dkt0xqpv3/image/upload', { method: 'POST', body: fd });
        const d = await res.json();
        if (d.secure_url) { setFormData(p => ({ ...p, image: d.secure_url })); resolve(); }
        else reject('Bağlantı hatası.');
      } catch (err) { reject(err); }
      finally { setUploadingImage(false); }
    });
    toast.promise(uploadPromise, { loading: 'Görsel buluta fırlatılıyor...', success: 'Görsel başarıyla yüklendi! 🚀', error: 'Görsel yüklenirken hata oluştu.' }, { style: { minWidth: '250px', ...TOAST_STYLE } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) { toast.error('Lütfen bir görsel yükleyin!', { style: TOAST_STYLE }); return; }
    setIsLoading(true);
    try {
      const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const result = await res.json();
      if (result.success) { toast.success('Ürün başarıyla eklendi! 💎', { style: TOAST_STYLE }); setFormData(EMPTY_FORM); mutate(); }
      else toast.error('Hata: ' + result.error, { style: TOAST_STYLE });
    } catch { toast.error('Bir şeyler ters gitti.', { style: TOAST_STYLE }); }
    finally { setIsLoading(false); }
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`/api/products/${deleteTarget._id}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.success) { toast.success('Ürün silindi.', { style: TOAST_STYLE }); mutate(); }
      else toast.error('Silme başarısız!', { style: TOAST_STYLE });
    } catch { toast.error('Silme sırasında hata oluştu.', { style: TOAST_STYLE }); }
    finally { setDeleteTarget(null); }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF8A00] selection:text-black">
      <Toaster position="top-right" reverseOrder={false} />
      {deleteTarget && <DeleteModal product={deleteTarget} onConfirm={handleDeleteConfirm} onCancel={() => setDeleteTarget(null)} />}
      {editTarget && <EditModal product={editTarget} onClose={() => setEditTarget(null)} onSave={() => mutate()} />}
      {showPassword && <PasswordModal onClose={() => setShowPassword(false)} />}

      {/* NAV */}
      <nav className="bg-[#0a0a0a] border-b border-white/5 px-6 py-4 sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#FF8A00]/10 border border-[#FF8A00]/30 rounded-xl flex items-center justify-center text-[#FF8A00] font-black text-xl">GC</div>
          <div>
            <h1 className="text-sm font-black tracking-widest uppercase leading-none">Komuta Merkezi</h1>
            <p className="text-[9px] text-gray-600 font-bold tracking-widest uppercase mt-0.5">Glory Cord Admin</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/urunler" target="_blank" className="hidden sm:flex text-gray-500 hover:text-[#FF8A00] text-xs font-bold tracking-widest uppercase transition-colors items-center gap-1">
            Vitrin <span>↗</span>
          </Link>
          <button onClick={() => setShowPassword(true)} className="px-5 py-2 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all">
            🔑 Şifre
          </button>
          <button onClick={() => router.push('/admin')} className="px-5 py-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all">
            Çıkış
          </button>
        </div>
      </nav>

      {/* İSTATİSTİK KARTI SATIRI */}
      <div className="border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#111] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FF8A00]/10 border border-[#FF8A00]/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📦</div>
            <div>
              <p className="text-3xl font-black text-white leading-none">{stats.total}</p>
              <p className="text-[9px] text-gray-500 font-black tracking-widest uppercase mt-1">Toplam Ürün</p>
            </div>
          </div>
          <div className="bg-[#111] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🏷️</div>
            <div>
              <p className="text-3xl font-black text-white leading-none">{stats.tagged}</p>
              <p className="text-[9px] text-gray-500 font-black tracking-widest uppercase mt-1">Etiketli Ürün</p>
            </div>
          </div>
          <div className="bg-[#111] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🔢</div>
            <div>
              <p className="text-3xl font-black text-white leading-none">{stats.coded}</p>
              <p className="text-[9px] text-gray-500 font-black tracking-widest uppercase mt-1">Kodlu Ürün</p>
            </div>
          </div>
          <div className="bg-[#111] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📂</div>
            <div>
              <p className="text-3xl font-black text-white leading-none">{uniqueCategories.length}</p>
              <p className="text-[9px] text-gray-500 font-black tracking-widest uppercase mt-1">Kategori</p>
            </div>
          </div>
        </div>

        {/* KATEGORİ DAĞILIM BARI */}
        {stats.total > 0 && (
          <div className="max-w-7xl mx-auto px-6 pb-6">
            <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
              <p className="text-[9px] text-gray-500 font-black tracking-widest uppercase mb-4">Kategori Dağılımı</p>
              <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                {stats.byCategory.filter(c => c.count > 0).map((cat, i) => {
                  const colors = ['bg-[#FF8A00]', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500'];
                  return <div key={cat.name} title={cat.name} className={`${colors[i % colors.length]} transition-all`} style={{ width: `${(cat.count / stats.total) * 100}%` }}></div>;
                })}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                {stats.byCategory.filter(c => c.count > 0).map((cat, i) => {
                  const colors = ['text-[#FF8A00]', 'text-blue-400', 'text-green-400', 'text-purple-400', 'text-pink-400'];
                  return (
                    <div key={cat.name} className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-black ${colors[i % colors.length]}`}>■</span>
                      <span className="text-[9px] text-gray-500 font-bold tracking-wider">{cat.name} ({cat.count})</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ANA İÇERİK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* SOL: ÜRÜN EKLEME FORMU */}
        <div className="lg:col-span-4">
          <div className="bg-[#0d0d0d] border border-white/5 p-8 rounded-3xl sticky top-24 shadow-2xl">
            <h2 className="text-lg font-black mb-6 flex items-center gap-3 tracking-tight">
              <span className="w-8 h-8 bg-[#FF8A00]/10 border border-[#FF8A00]/30 rounded-lg flex items-center justify-center text-[#FF8A00] text-sm">+</span>
              Yeni Ürün Ekle
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* GÖRSEL YÜKLEME */}
              <div className={`relative border-2 border-dashed ${formData.image ? 'border-[#FF8A00]' : 'border-white/10'} rounded-2xl overflow-hidden group cursor-pointer hover:border-[#FF8A00] transition-colors bg-[#080808]`} style={{ minHeight: '110px' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                {formData.image && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${formData.image})` }}><div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div></div>}
                <div className="relative z-10 flex flex-col items-center justify-center gap-2 py-8">
                  <span className={`text-2xl ${uploadingImage ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'}`}>{formData.image ? '📸' : '☁️'}</span>
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{uploadingImage ? 'Yükleniyor...' : formData.image ? 'Değiştirmek İçin Tıkla' : 'Görsel Seç veya Sürükle'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Ürün Adı</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#080808] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none text-white placeholder:text-gray-700 transition-all" placeholder="Örn: Mat Siyah Kordon" />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Ürün Kodu <span className="text-gray-700">(Ops.)</span></label>
                  <input type="text" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} className="w-full bg-[#080808] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none text-white placeholder:text-gray-700 transition-all" placeholder="GC-001" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Kategori</label>
                <input
                  required
                  type="text"
                  list="cat-suggestions"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#080808] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none text-white placeholder:text-gray-700 transition-all"
                  placeholder="Kategori yazın veya listeden seçin..."
                />
                <datalist id="cat-suggestions">
                  {CATEGORY_SUGGESTIONS.map(c => <option key={c} value={c} />)}
                </datalist>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Açıklama / Detaylar</label>
                <textarea required rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-[#080808] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none text-white resize-none placeholder:text-gray-700 transition-all" placeholder="Ürünün dokuması, materyali, kalınlığı..."></textarea>
              </div>

              <div>
                <label className="block text-[10px] text-gray-500 font-black tracking-widest uppercase mb-2">Etiket <span className="text-gray-700">(Opsiyonel)</span></label>
                <input type="text" value={formData.tag} onChange={e => setFormData({ ...formData, tag: e.target.value })} className="w-full bg-[#080808] border border-white/10 rounded-xl p-3 text-sm focus:border-[#FF8A00] outline-none text-white placeholder:text-gray-700 transition-all" placeholder="YENİ, VIP, ÖZEL vb." />
              </div>

              <button disabled={isLoading || uploadingImage} type="submit" className="w-full mt-2 bg-[#FF8A00] text-black font-black text-xs tracking-[0.2em] uppercase py-4 rounded-xl hover:bg-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,138,0,0.15)] hover:shadow-[0_0_30px_rgba(255,138,0,0.4)] active:scale-95">
                {isLoading ? 'Ekleniyor...' : '+ Kataloğa Ekle'}
              </button>
            </form>
          </div>
        </div>

        {/* SAĞ: ÜRÜN LİSTESİ */}
        <div className="lg:col-span-8">
          <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 md:p-8">

            {/* LİSTE BAŞLIĞI & FİLTRELER */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-black tracking-tight">Yayındaki Ürünler</h2>
                <span className="px-3 py-1.5 bg-[#FF8A00]/10 text-[#FF8A00] border border-[#FF8A00]/20 rounded-lg text-[10px] font-black tracking-widest">
                  {products.length} SONUÇ
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Ürün Ara..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="flex-1 bg-[#080808] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] outline-none placeholder:text-gray-700 transition-all"
                />
                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  className="bg-[#080808] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-400 focus:border-[#FF8A00] outline-none transition-all"
                >
                  <option value="Tümü">Tüm Kategoriler</option>
                  {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* ÜRÜN GRID */}
            {isProductsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className="bg-[#080808] border border-white/5 rounded-2xl h-28 animate-pulse flex overflow-hidden">
                    <div className="w-28 bg-gray-800/40 flex-shrink-0"></div>
                    <div className="flex-1 p-4 flex flex-col justify-center gap-2">
                      <div className="h-2 w-1/3 bg-gray-800 rounded"></div>
                      <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
                      <div className="h-2 w-1/2 bg-gray-800 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-400 font-bold border border-red-500/20 rounded-2xl bg-red-500/5 text-sm">
                Ürünler yüklenirken hata oluştu.
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/5 rounded-2xl">
                <span className="text-4xl mb-4 block opacity-30">📦</span>
                <p className="text-gray-500 font-bold text-sm">Ürün bulunamadı.</p>
                <p className="text-gray-700 text-[10px] uppercase tracking-widest mt-2">
                  {searchTerm || filterCategory !== 'Tümü' ? 'Farklı filtre deneyin.' : 'İlk ürününüzü ekleyin.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map(product => (
                  <div key={product._id} className="bg-[#080808] border border-white/5 rounded-2xl overflow-hidden flex group hover:border-[#FF8A00]/20 transition-all relative">

                    {/* GÖRSEL */}
                    <div className="w-28 flex-shrink-0 relative overflow-hidden bg-[#050505]">
                      <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: `url('${product.image}')` }}></div>
                    </div>

                    {/* İÇERİK */}
                    <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-gray-600 text-[8px] font-black tracking-widest uppercase">{product.category}</span>
                          {product.tag && <span className="text-[8px] font-black text-[#FF8A00] bg-[#FF8A00]/10 px-2 py-0.5 rounded flex-shrink-0">{product.tag}</span>}
                        </div>
                        <h3 className="text-white font-bold text-sm leading-tight truncate">{product.name}</h3>
                        {product.code && <span className="text-[9px] font-black text-blue-400/80 tracking-widest"># {product.code}</span>}
                        <p className="text-gray-500 text-[10px] line-clamp-2 mt-1 leading-relaxed">{product.description}</p>
                      </div>

                      {/* AKSIYON BUTONLARI */}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setEditTarget(product)}
                          className="flex-1 py-1.5 bg-white/5 hover:bg-[#FF8A00]/10 hover:text-[#FF8A00] border border-white/10 hover:border-[#FF8A00]/30 text-gray-400 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => setDeleteTarget(product)}
                          className="flex-1 py-1.5 bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/10 hover:border-red-500/20 text-gray-400 rounded-lg text-[9px] font-black tracking-widest uppercase transition-all"
                        >
                          Sil
                        </button>
                      </div>
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
