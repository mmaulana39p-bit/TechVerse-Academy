/* ===== Pengaturan ===== */
const TAGLINE = 'Code. Build. Engineer.';
const NEXT_PAGE = 'index.html';   // halaman tujuan (login)
const AUTO_REDIRECT = true;       // false = hanya tombol "Mulai"
const REDIRECT_DELAY = 1500;      // ms setelah loading 100%

const LOG_LINES = [
  'Inisialisasi sistem...',
  'Memuat modul pemrograman...',
  'Menyiapkan alat teknik...',
  'Menghubungkan database...',
  'Kompilasi antarmuka...',
  'Siap dijalankan!'
];

/* ===== Elemen ===== */
const typingEl  = document.getElementById('typing');
const terminal  = document.getElementById('terminal');
const bar       = document.getElementById('bar');
const percentEl = document.getElementById('percent');
const startBtn  = document.getElementById('startBtn');
const floaters  = document.getElementById('floaters');

/* ===== Suara =====
   Taruh file di folder sounds/ (nama file harus sama persis) */
const bgm      = new Audio('ambient.mp3');  // musik latar (loop)
const sfxType  = new Audio('type.mp3');     // bunyi tiap baris terminal
const sfxReady = new Audio('ready.mp3');    // bunyi saat loading selesai
bgm.loop = true;
bgm.volume = 0.5;

function playSound(audio) {
  audio.currentTime = 0;
  audio.play().catch(() => {});   // abaikan error (file tidak ada / diblokir browser)
}

// Browser hanya mengizinkan suara setelah pengguna menyentuh halaman
document.addEventListener('click', () => playSound(bgm), { once: true });

/* ===== 1. Efek mengetik pada tagline ===== */
function typeText(text, i = 0) {
  if (i > text.length) return;
  typingEl.textContent = text.slice(0, i);
  setTimeout(() => typeText(text, i + 1), 90);
}
typeText(TAGLINE);

/* ===== 2. Simbol kode melayang di latar ===== */
const SYMBOLS = ['</>', '{ }', '01', '[ ]', '&&', '=>', '#', '0xFF', 'fn()', ';'];

for (let i = 0; i < 18; i++) {
  const span = document.createElement('span');
  span.className = 'floater';
  span.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  span.style.left = Math.random() * 100 + '%';
  span.style.fontSize = 12 + Math.random() * 14 + 'px';
  span.style.animationDuration = 8 + Math.random() * 10 + 's';
  span.style.animationDelay = Math.random() * 8 + 's';
  floaters.appendChild(span);
}

/* ===== 3. Loading: terminal + progress bar ===== */
let progress = 0;
let lineIndex = 0;

function addLine(text, done) {
  const div = document.createElement('div');
  div.className = 'line';
  div.innerHTML = `<span class="prompt">$</span> ${text} ` +
                  (done ? '<span class="ok">[OK]</span>' : '');
  terminal.appendChild(div);
  // simpan maksimal 5 baris agar tidak meluap
  while (terminal.children.length > 5) terminal.firstChild.remove();
  playSound(sfxType);
}

function setProgress(value) {
  progress = Math.min(value, 100);
  bar.style.width = progress + '%';
  percentEl.textContent = Math.floor(progress);
}

function finish() {
  bgm.pause();
  playSound(sfxReady);
  startBtn.classList.add('show');
  if (AUTO_REDIRECT) {
    setTimeout(() => (window.location.href = NEXT_PAGE), REDIRECT_DELAY);
  }
}

function step() {
  if (lineIndex < LOG_LINES.length) {
    const isLast = lineIndex === LOG_LINES.length - 1;
    addLine(LOG_LINES[lineIndex], isLast);
    lineIndex++;
    setProgress((lineIndex / LOG_LINES.length) * 100);
    setTimeout(step, 600 + Math.random() * 500);
  } else {
    finish();
  }
}

setTimeout(step, 600);
  
