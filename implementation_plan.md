# Implementasi Website EverGreen Lawn Care (Astro 5)

Proyek ini bertujuan untuk membangun website bisnis layanan perawatan rumput (Lawn Care) menggunakan Astro 5 dengan React untuk UI interaktif, Tailwind CSS untuk styling, dan Content Layer API untuk manajemen data statis.

## User Review Required

> [!IMPORTANT]
> Harap tinjau rencana implementasi ini. Apakah Anda setuju dengan struktur komponen, cara saya mengelola konten (menggunakan Content Layer untuk Gallery, Services, Testimonials, FAQ, dan Service Areas), dan penggunaan Astro Actions untuk form kontak?
>
> Sebagai catatan, karena ini proyek kosong, saya akan melakukan inisialisasi Astro 5 beserta instalasi React dan Tailwind.

## Open Questions

> [!WARNING]
> 1.  Apakah kita perlu membuat dummy data lengkap (24 proyek gallery, 20 testimonial, 20 FAQ) saat inisialisasi, atau hanya beberapa saja dan sisanya menggunakan script generator/placeholder?
> 2.  Apakah Anda memiliki preferensi palet warna spesifik untuk "EverGreen Lawn Care"? (Saya mengasumsikan nuansa Hijau Alami/Earthy Green sebagai tema utama jika tidak ada spesifikasi khusus).

## Proposed Changes

### 1. Inisialisasi Proyek & Dependencies

- Menjalankan perintah create astro untuk inisialisasi framework dengan file-file pendukung.
- Menginstall integrasi React (`@astrojs/react`) dan Tailwind CSS (`@astrojs/tailwind`).
- Memperbarui `astro.config.mjs` sesuai kebutuhan (misalnya konfigurasi whitelist domain gambar).

### 2. Struktur Dasar & Layouts

Membuat struktur dasar sesuai `docs/astro-guide/architecture.md`.

#### [NEW] src/layouts/BaseLayout.astro
Layout utama yang memuat tag HTML, meta SEO, header (navbar sticky), dan footer. Menggunakan `astro:transitions` untuk View Transitions.

### 3. Komponen UI (Astro Statis & React Islands)

Memisahkan komponen statis murni dengan komponen yang butuh interaktivitas klien (React).

#### [NEW] src/components/ui/
Komponen Astro murni:
- `Button.astro`: Tombol standar.
- `ServiceCard.astro`: Menampilkan ringkasan layanan.
- `HeroSection.astro`: Bagian hero pada halaman Home.
- `Footer.astro`: Footer statis.

#### [NEW] src/components/islands/
Komponen React (`client:load` atau `client:visible`):
- `Header.tsx`: Navbar sticky dengan menu mobile (hamburger toggle).
- `FaqAccordion.tsx`: Akordeon interaktif untuk halaman FAQ.
- `TestimonialCarousel.tsx`: Carousel/Slider testimonial.
- `GalleryGrid.tsx`: Grid galeri (mungkin dengan fitur filter berdasarkan tipe servis).
- `ContactForm.tsx`: Form yang akan berkomunikasi dengan Astro Actions untuk pengiriman pesan.

### 4. Content Layer API (Astro 5)

Menggunakan Astro 5 Loader (glob lokal) untuk mengelola data terstruktur alih-alih hardcoding data di dalam halaman.

#### [NEW] src/content/config.ts
Mendefinisikan schema `zod` dan loader untuk koleksi:
- `services` (Lawn Mowing, dsb)
- `gallery` (Kumpulan proyek foto)
- `testimonials` (Ulasan pelanggan)
- `faq` (Daftar FAQ)
- `areas` (Service areas seperti Brisbane, Logan, dsb)

#### [NEW] src/content/
Folder yang berisi file JSON/MD untuk data dummy awal.

### 5. Astro Actions untuk Form Submission

Sesuai panduan `do-not-use.md`, kita dilarang menggunakan endpoint manual untuk API form.

#### [NEW] src/actions/index.ts
Mendefinisikan `contact` action untuk menangani data yang masuk dari `ContactForm.tsx` atau `<form>` bawaan.

### 6. Halaman / Pages (Routing File-Based)

Membuat halaman statis dari routing dasar dan koleksi data.

#### [NEW] src/pages/index.astro
Halaman Beranda sesuai poin dalam `clients.md` (Hero, Services, Process, Testimonial, Gallery Preview, CTA).

#### [NEW] src/pages/about.astro
Halaman "About Us".

#### [NEW] src/pages/services/index.astro & src/pages/services/[slug].astro
Halaman daftar layanan dan detail individual tiap layanan yang di-render dari koleksi `services`.

#### [NEW] src/pages/gallery.astro
Halaman galeri dengan grid foto proyek.

#### [NEW] src/pages/testimonials.astro
Halaman kumpulan 20 ulasan pelanggan.

#### [NEW] src/pages/faq.astro
Halaman berisi `FaqAccordion.tsx`.

#### [NEW] src/pages/contact.astro
Halaman informasi kontak, form kontak, dan Google Maps embed.

#### [NEW] src/pages/areas/[slug].astro
Halaman dinamis untuk masing-masing Service Area (Brisbane, Logan, dll) yang bermanfaat untuk SEO lokal.

## Verification Plan

### Automated Tests
- Menjalankan `npm run build` untuk memastikan tidak ada eror tipe TypeScript, dan Astro berhasil menghasilkan render statis (SSG).

### Manual Verification
- Menjalankan `npm run dev` dan memeriksa halaman utama di browser.
- Menguji `ViewTransitions` antar halaman.
- Memastikan `ContactForm` memanggil Astro Action dan mendapat respons yang benar (simulasi sukses tanpa kirim email sungguhan).
- Menguji tampilan Mobile untuk mengecek Navbar, responsivitas grid galeri, serta letak "Click-to-call button".
