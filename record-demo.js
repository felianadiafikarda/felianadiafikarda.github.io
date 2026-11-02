import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfigurasi Rekaman
const CONFIG = {
  url: 'http://localhost:3000',
  outputFile: path.join(__dirname, 'demo.mp4'),
  viewport: {
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
  },
  fps: 60,
  // Waktu tunggu intro hero animasi selesai (dalam milidetik)
  introWaitMs: 4800,
  // Durasi efek zoom per elemen (dalam milidetik)
  zoomDurationMs: 2500,
  // Durasi transisi kembali normal (dalam milidetik)
  zoomTransitionWaitMs: 900,
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Injeksi style CSS untuk efek highlight / subtle zoom yang halus
 */
async function injectHighlightStyles(page) {
  await page.addStyleTag({
    content: `
      /* Transisi zoom halus untuk elemen yang disorot */
      .demo-focus-highlight {
        transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), 
                    box-shadow 0.85s ease,
                    border-color 0.85s ease !important;
        transform: scale(1.08) translateY(-6px) !important;
        box-shadow: 0 25px 50px -12px rgba(14, 165, 233, 0.45) !important;
        z-index: 50 !important;
        position: relative !important;
      }

      /* Khusus tema gelap jika diperlukan */
      .dark .demo-focus-highlight {
        box-shadow: 0 25px 55px -10px rgba(56, 189, 248, 0.5) !important;
      }

      /* Highlight khusus untuk kartu proyek */
      .demo-focus-highlight-card {
        transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), 
                    box-shadow 0.85s ease,
                    border-color 0.85s ease !important;
        transform: scale(1.06) translateY(-8px) !important;
        box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.45) !important;
        z-index: 40 !important;
        position: relative !important;
      }

      /* Sembunyikan scrollbar default agar video rekaman tampak rapi */
      ::-webkit-scrollbar {
        width: 0px !important;
        background: transparent !important;
      }
      * {
        scrollbar-width: none !important;
      }
    `,
  });
}

/**
 * Berikan efek zoom-in sementara pada selector tertentu
 */
async function highlightElement(page, selector, className = 'demo-focus-highlight', durationMs = CONFIG.zoomDurationMs) {
  const exists = await page.$(selector);
  if (!exists) {
    console.log(`⚠️ Elemen '${selector}' tidak ditemukan, melewati zoom.`);
    return;
  }

  console.log(`🔍 Memberikan efek zoom pada: ${selector}...`);
  await page.evaluate((sel, cls) => {
    const el = document.querySelector(sel);
    if (el) el.classList.add(cls);
  }, selector, className);

  // Tahan zoom beberapa detik
  await sleep(durationMs);

  // Kembalikan ke ukuran normal dengan transisi halus
  await page.evaluate((sel, cls) => {
    const el = document.querySelector(sel);
    if (el) el.classList.remove(cls);
  }, selector, className);

  // Tunggu transisi kembali normal selesai
  await sleep(CONFIG.zoomTransitionWaitMs);
}

/**
 * Scroll halus (buttery-smooth) dari posisi saat ini ke target koordinat Y menggunakan requestAnimationFrame
 */
async function smoothScrollTo(page, targetY, durationMs = 2000) {
  await page.evaluate(
    ({ targetY, durationMs }) => {
      return new Promise((resolve) => {
        const startY = window.scrollY;
        const diff = targetY - startY;
        const startTime = performance.now();

        function step(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / durationMs, 1);

          // Easing In-Out Quad untuk pergerakan kamera halus
          const ease =
            progress < 0.5
              ? 2 * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;

          window.scrollTo(0, startY + diff * ease);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        }

        requestAnimationFrame(step);
      });
    },
    { targetY, durationMs }
  );

  // Pause sebentar di checkpoint
  await sleep(400);
}

/**
 * Dapatkan posisi scroll absolut elemen
 */
async function getElementScrollOffset(page, selector, verticalAlignment = 0.25) {
  return await page.evaluate((sel, align) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // Berikan margin agar elemen berada di posisi yang nyaman dilihat
    return Math.max(0, Math.round(rect.top + scrollTop - window.innerHeight * align));
  }, selector, verticalAlignment);
}

async function main() {
  console.log('🚀 Memulai browser Puppeteer...');

  const browser = await puppeteer.launch({
    headless: false, // Diset false agar proses perekaman terlihat (dapat diubah ke 'new' / true jika diinginkan)
    defaultViewport: CONFIG.viewport,
    args: [
      `--window-size=${CONFIG.viewport.width},${CONFIG.viewport.height + 80}`,
      '--disable-web-security',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(CONFIG.viewport);

    console.log(`🌐 Membuka ${CONFIG.url}...`);
    try {
      await page.goto(CONFIG.url, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });
    } catch (err) {
      console.error(`❌ Gagal terhubung ke ${CONFIG.url}. Pastikan server lokal aktif (contoh: npm run dev).`);
      throw err;
    }

    // Injeksi style untuk zoom & styling rekaman
    await injectHighlightStyles(page);

    console.log(`⏳ Menunggu intro & animasi hero selesai (${CONFIG.introWaitMs / 1000}s)...`);
    await sleep(CONFIG.introWaitMs);

    // Inisialisasi Screen Recorder
    const recorder = new PuppeteerScreenRecorder(page, {
      followNewTab: false,
      fps: CONFIG.fps,
      videoFrame: {
        width: CONFIG.viewport.width,
        height: CONFIG.viewport.height,
      },
      aspectRatio: '16:9',
    });

    console.log(`🔴 Mulai merekam layar ke '${path.basename(CONFIG.outputFile)}'...`);
    await recorder.start(CONFIG.outputFile);

    // Beri jeda 1 detik di awal rekaman pada Hero section
    await sleep(1000);

    // ==========================================
    // 1. SOROTAN ELEMEN 1: ID Card Badge di Hero
    // ==========================================
    const idCardSelector = '#hero-id-card';
    await highlightElement(page, idCardSelector, 'demo-focus-highlight', CONFIG.zoomDurationMs);

    // ==========================================
    // 2. SCROLL PERLAHAN MENUJU BAGIAN TENTANG (ABOUT) & PENGALAMAN
    // ==========================================
    const aboutOffset = await getElementScrollOffset(page, '#tentang', 0.2);
    if (aboutOffset !== null) {
      console.log('📜 Scrolling halus ke bagian About...');
      await smoothScrollTo(page, aboutOffset, 2200);
      await sleep(1000);
    }

    const expOffset = await getElementScrollOffset(page, '#pengalaman', 0.2);
    if (expOffset !== null) {
      console.log('📜 Scrolling halus ke bagian Experience...');
      await smoothScrollTo(page, expOffset, 2400);
      await sleep(1200);
    }

    // ==========================================
    // 3. SCROLL KE BAGIAN PROYEK & SOROTAN ELEMEN 2
    // ==========================================
    const projectOffset = await getElementScrollOffset(page, '#proyek', 0.15);
    if (projectOffset !== null) {
      console.log('📜 Scrolling halus ke bagian Featured Projects...');
      await smoothScrollTo(page, projectOffset, 2400);
      await sleep(1000);

      // Sorot kartu proyek utama (Featured Project Card)
      const projectCardSelector = '#featured-project-card, #proyek article';
      await highlightElement(page, projectCardSelector, 'demo-focus-highlight-card', CONFIG.zoomDurationMs);
    }

    // ==========================================
    // 4. SCROLL KE SERTIFIKASI, SKILLS, DAN KONTAK HINGGA AKHIR HALAMAN
    // ==========================================
    const trainingOffset = await getElementScrollOffset(page, '#sertifikasi', 0.2);
    if (trainingOffset !== null) {
      console.log('📜 Scrolling halus ke bagian Sertifikasi...');
      await smoothScrollTo(page, trainingOffset, 2200);
      await sleep(1000);
    }

    const skillsOffset = await getElementScrollOffset(page, '#keahlian', 0.2);
    if (skillsOffset !== null) {
      console.log('📜 Scrolling halus ke bagian Skills...');
      await smoothScrollTo(page, skillsOffset, 2200);
      await sleep(1000);
    }

    // Scroll ke bagian paling bawah (Contact & Footer)
    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log('📜 Scrolling halus ke akhir halaman (Kontak)...');
    await smoothScrollTo(page, totalHeight, 2600);

    // Beri jeda 2 detik di bagian akhir sebelum stop rekaman
    console.log('✨ Menahan tampilan akhir beberapa detik...');
    await sleep(2000);

    // Stop rekaman
    console.log('⏹️ Menghentikan rekaman...');
    await recorder.stop();

    console.log(`🎉 Rekaman berhasil disimpan! File: ${CONFIG.outputFile}`);
    if (fs.existsSync(CONFIG.outputFile)) {
      const stats = fs.statSync(CONFIG.outputFile);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`📁 Ukuran file: ${sizeMB} MB`);
    }
  } catch (error) {
    console.error('❌ Terjadi kesalahan saat merekam:', error);
  } finally {
    await browser.close();
    console.log('🏁 Browser ditutup.');
  }
}

main();
