# 🍽️ QR Menü Sistemi Kurulumu

Bu dokümanda QR menü sisteminin nasıl kurulacağı ve kullanılacağı açıklanmaktadır.

## 🚀 Kurulum Adımları

### 1. Backend Kurulumu

#### Gerekli Paketler

```bash
cd apps/backend
npm install
```

#### Supabase Kurulumu

1. Supabase projesi oluşturun
2. `.env` dosyasına Supabase bilgilerini ekleyin:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

#### Veritabanı Kurulumu

1. Supabase SQL Editor'da `001_create_menus_table.sql` dosyasını çalıştırın
2. Bu işlem `menus` tablosunu ve gerekli index'leri oluşturacak

#### Backend'i Başlatın

```bash
npm run dev
```

### 2. Frontend Kurulumu

#### Gerekli Paketler

```bash
cd apps/landing
npm install
```

#### Frontend'i Başlatın

```bash
npm run dev
```

## 📊 Veritabanı Yapısı

### `menus` Tablosu

- `id`: UUID (Primary Key)
- `user_id`: UUID (Auth users referansı)
- `restaurant_name`: TEXT (Restoran adı)
- `restaurant_description`: TEXT (Restoran açıklaması)
- `restaurant_address`: TEXT (Restoran adresi)
- `restaurant_phone`: TEXT (Telefon)
- `restaurant_email`: TEXT (Email)
- `restaurant_category`: TEXT (Kategori)
- `subdomain`: TEXT (Benzersiz subdomain)
- `plan`: TEXT (Plan türü)
- `payment_method`: TEXT (Ödeme yöntemi)
- `status`: TEXT (Durum: active/inactive/suspended)
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

## 🔐 API Endpoints

### Menü Oluşturma

```
POST /api/menu/create
Authorization: Bearer {token}
Body: {
  restaurantInfo: {
    name: string,
    description: string,
    address: string,
    phone: string,
    email: string,
    category: string
  },
  subdomain: string,
  plan: string,
  paymentMethod: string,
  userId: string
}
```

### Menü Getirme (Subdomain ile)

```
GET /api/menu/:subdomain
```

### Kullanıcının Menüleri

```
GET /api/menu/user/:userId
Authorization: Bearer {token}
```

## 🎯 Kullanım Akışı

1. **Kullanıcı Girişi**: AuthModal ile giriş yapın
2. **Menü Oluşturma**: CreateMenuModal ile menü bilgilerini girin
3. **Adım 1**: Restoran bilgileri
4. **Adım 2**: Subdomain seçimi
5. **Adım 3**: Plan ve ödeme yöntemi
6. **Veritabanına Kayıt**: Menü otomatik olarak veritabanına kaydedilir
7. **Başarı**: Menü URL'i gösterilir

## 🔒 Güvenlik

- **Row Level Security (RLS)**: Kullanıcılar sadece kendi menülerini görebilir
- **Authentication**: Tüm işlemler için JWT token gerekli
- **Validation**: Frontend ve backend'de çift validation
- **Subdomain Uniqueness**: Benzersiz subdomain kontrolü

## 🛠️ Geliştirme

### Yeni Özellik Ekleme

1. Backend'de controller ve route ekleyin
2. Frontend'de form ve validation ekleyin
3. Veritabanı migration'ı oluşturun

### Hata Ayıklama

- Backend console'da API log'larını kontrol edin
- Frontend console'da form validation hatalarını kontrol edin
- Supabase log'larında veritabanı işlemlerini kontrol edin

## 📝 Notlar

- Sistem Supabase Auth ile entegre çalışır
- Menüler otomatik olarak kullanıcıya bağlanır
- Subdomain'ler benzersiz olmalıdır
- Plan ve ödeme yöntemi bilgileri saklanır
- Menü durumu (active/inactive/suspended) yönetilebilir

## 🆘 Sorun Giderme

### Yaygın Hatalar

1. **CORS Hatası**: Backend CORS ayarlarını kontrol edin
2. **Auth Hatası**: JWT token'ın geçerli olduğundan emin olun
3. **Database Hatası**: Supabase bağlantısını kontrol edin
4. **Validation Hatası**: Form alanlarının doğru doldurulduğundan emin olun

### Destek

Sorun yaşarsanız:

1. Console log'larını kontrol edin
2. Network tab'ında API çağrılarını inceleyin
3. Supabase dashboard'da veritabanı durumunu kontrol edin
