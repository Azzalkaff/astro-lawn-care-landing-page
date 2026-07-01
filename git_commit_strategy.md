# Git Multi-Branch Strategy: Lawn Services Template

Memecah pekerjaan menjadi beberapa *branch* (cabang) adalah standar industri perangkat lunak modern (seperti *GitFlow* atau *Feature Branching*). Ini menunjukkan bahwa Anda terbiasa bekerja dalam tim dan menjaga *branch* `main` selalu dalam keadaan bersih dan siap produksi (*production-ready*).

Berikut adalah strategi percabangan (*branching*) yang mematikan untuk portfolio Anda. Semua *branch* akan berawal dari `main` dan nantinya di-*merge* kembali (seolah-olah melalui *Pull Request*).

---

## 🚀 Terminal Commands (Siap Copy-Paste)

Jalankan perintah ini secara berurutan di terminal Anda (pastikan Anda berada di dalam folder `Lawn-Services/Reusable-Template`):

### 1. Inisialisasi & Branch `main`
```bash
git init
git add package.json astro.config.mjs tsconfig.json package-lock.json
git commit -m "chore: init astro project with react and tailwind v4"
```

### 2. Branch `feature/infrastructure`
```bash
git checkout -b feature/infrastructure
git add src/layouts/ src/styles/
git commit -m "feat(layout): setup BaseLayout and global CSS variables"
git checkout main
git merge feature/infrastructure
```

### 3. Branch `feature/content-layer`
```bash
git checkout -b feature/content-layer
git add src/content/config.ts
git commit -m "feat(content): define schemas for services, gallery, faq, and testimonials"
git add src/content/
git commit -m "chore(content): seed initial dummy data for local SEO"
git checkout main
git merge feature/content-layer
```

### 4. Branch `feature/core-ui`
```bash
git checkout -b feature/core-ui
git add src/components/ui/Header.astro src/components/ui/Footer.astro
git commit -m "feat(ui): build global Header navigation and responsive Footer"
git add src/components/ui/Button.astro src/components/ui/ServiceCard.astro
git commit -m "feat(ui): build reusable UI components"
git checkout main
git merge feature/core-ui
```

### 5. Branch `feature/homepage`
```bash
git checkout -b feature/homepage
git add src/components/ui/HeroSection.astro src/pages/index.astro
git commit -m "feat(home): build Hero section with primary lead-gen CTA"
git add src/components/Services.astro
git commit -m "feat(home): implement Services grid section"
git add src/components/Testimonials.astro src/components/FAQ.astro
git commit -m "feat(trust): build Testimonials and FAQ accordion sections"
git checkout main
git merge feature/homepage
```

### 6. Branch `feature/react-islands`
```bash
git checkout -b feature/react-islands
git add src/components/islands/BeforeAfterSlider.tsx
git commit -m "feat(gallery): build BeforeAfterSlider react island"
git add src/components/islands/AppointmentForm.tsx
git commit -m "feat(booking): implement interactive AppointmentForm component"
git add src/actions/
git commit -m "feat(api): setup Astro Actions for form submissions"
git checkout main
git merge feature/react-islands
```

### 7. Branch `feature/seo-routing` (Final)
```bash
git checkout -b feature/seo-routing
git add src/pages/services/
git commit -m "feat(pages): implement dynamic routing for individual service pages"
git add src/components/SEO.astro public/
git commit -m "feat(seo): add meta tags, OpenGraph, and Local Business schema markup"
git checkout main
git merge feature/seo-routing
```

### 8. Masukkan sisa file yang belum masuk (Jika ada)
```bash
git add .
git commit -m "chore: final polish and bug fixes"
```

---

## 💡 Keuntungan Multi-Branch:
Jika calon klien atau teknikal rekruter membuka repositori Anda, mereka akan melihat grafik *network* yang bercabang-cabang dengan rapi. Ini memberikan impresi psikologis: **"Orang ini bukan pemula. Dia mengerti CI/CD, alur kerja tim, dan penulisan kode yang disiplin."**
