# AkrotesOS — Geliştirme Ortamı Kurulum Rehberi

**Son Güncelleme:** 21 Mart 2026

---

## Gereksinimler

| Araç | Minimum Versiyon | Kontrol Komutu |
|------|-----------------|----------------|
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| PostgreSQL | 16+ | `psql --version` |
| Git | 2.30+ | `git --version` |

---

## 1. Repo Klonla

```bash
cd ~/Projects
git clone git@github.com:daglierdal/AkrotesOS.git
cd AkrotesOS
```

> **Not:** SSH key GitHub hesabına ekli olmalı. Test: `ssh -T git@github.com`

---

## 2. PostgreSQL Kurulum

### macOS (Homebrew)
```bash
brew install postgresql@16
brew services start postgresql@16
createdb akrotesos_dev
```

### Linux (Ubuntu/Debian)
```bash
sudo apt install postgresql-16
sudo systemctl enable postgresql
sudo systemctl start postgresql
sudo -u postgres createdb akrotesos_dev
```

PostgreSQL'in kalici calastigini dogrula:
```bash
# macOS
brew services list | grep postgresql

# Linux
systemctl status postgresql
```

> **KRITIK:** `nohup`, `screen` veya `&` ile arka plana atma. Sistem servisi olarak calisalmali.

---

## 3. Backend Kurulum

```bash
cd backend
cp .env.example .env # yoksa asagidaki sablonu kullan
npm install
```

### Backend .env Sablonu

```env
DATABASE_URL="postgresql://KULLANICI:@localhost:5432/akrotesos_dev"
JWT_SECRET="akrotes-dev-secret-2026"
PORT=4000
NODE_ENV=development
COOKIE_DOMAIN=localhost
```

> `KULLANICI` kismini kendi OS kullanici adinla degistir (macOS'ta `whoami` komutuyla ogran).

### Veritabani Hazirlik

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Seed ile olusturulan veriler:

| Veri | Detay |
|------|-------|
| Tenant | Akrotes Mimarlik A.S. (plan: PRO) |
| Admin | admin@akrotes.com.tr / admin123 |
| Kullanicilar | asiye, melike, erhan, buse (sifre: akrotes2026) |
| Proje | MACFit Yeni Kulup Acilisi |

### Backend Basla

```bash
npm run dev
```

Backend `http://localhost:4000` adresinde calissir.

---

## 4. Frontend Kurulum

```bash
cd frontend
cp .env.local.example .env.local # yoksa asagidaki sablonu kullan
npm install
```

### Frontend .env.local Sablonu

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Frontend Basla

```bash
npm run dev
```

Frontend `http://localhost:3000` adresinde calissir.

---

## 5. Dogrulama Testleri

Backend calissirken asagidaki komutlari calistir:

```bash
# 1. Sunucu durumu
curl http://localhost:4000/health
# Beklenen: {"status":"ok","timestamp":"...","version":"1.0.0"}

# 2. Veritabani baglantisi
curl http://localhost:4000/health/db
# Beklenen: {"status":"ok","database":"connected"}

# 3. Login
curl -X POST http://localhost:4000/api/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"admin@akrotes.com.tr","password":"admin123"}'
# Beklenen: {"user":{...},"token":"eyJ..."}

# 4. Kimlik dogrulama (ustteki token ile)
curl http://localhost:4000/api/auth/me \
 -H "Cookie: akro_token=BURAYA_TOKEN_YAZ"
# Beklenen: {"user":{...}}
```

4/4 gecerse ortam hazir.

---

## Bilinen Tuzaklar

| Sorun | Cozum |
|-------|-------|
| `ECONNREFUSED :5432` | PostgreSQL servisi calismiyorsa → `brew services start postgresql@16` |
| Prisma migration hatasi | DB sifirla: `npx prisma migrate reset --force` |
| Cookie calismiyorsa | `COOKIE_DOMAIN=localhost` olmali (dev ortami) |
| Frontend API'ye ulasimiyor | `NEXT_PUBLIC_API_URL` dogru mu kontrol et, sonra `npm run build` |
| `NEXT_PUBLIC_` degiskeni degisti | Redeploy yetmez, `npm run build` gerekir |

---

## npm Script Referansi

### Backend (`cd backend`)

| Komut | Ne Yapar |
|-------|----------|
| `npm run dev` | Gelistirme sunucusu (nodemon + ts-node) |
| `npm run build` | TypeScript → JavaScript derle |
| `npm start` | Production sunucusu (dist/ klasorunden) |
| `npx prisma migrate dev` | Yeni migration olustur ve uygula |
| `npx prisma generate` | Prisma client yenile |
| `npx prisma db seed` | Demo verileri yukle |
| `npx prisma studio` | Veritabani gorsel arayuzu (tarayicida acilir) |

### Frontend (`cd frontend`)

| Komut | Ne Yapar |
|-------|----------|
| `npm run dev` | Gelistirme sunucusu (Next.js) |
| `npm run build` | Production build |
| `npm start` | Production sunucusu |
