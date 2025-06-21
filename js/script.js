// ===== KONFIGURASI UTAMA =====
const CONFIG = {
  PETUGAS_URL: 'https://raw.githubusercontent.com/Koramil05/JADWAL/main/piket.txt',
  STORAGE_KEYS: {
    KORAMIL: 'dataJadwalKoramil',
    KEDIAMAN: 'dataJadwalKediaman',
    MAKODIM: 'dataJadwalMakodim'
  }
};

// ===== VARIABEL GLOBAL =====
let state = {
  dataJadwal: {
    koramil: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.KORAMIL)) || {},
    kediaman: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.KEDIAMAN)) || {},
    makodim: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.MAKODIM)) || {}
  },
  activeTab: 'koramil',
  currentDate: new Date(),
  petugasList: []
};

// ===== INISIALISASI APLIKASI =====
document.addEventListener('DOMContentLoaded', async () => {
  await loadPetugas();
  initCalendar();
  setupEventListeners();
  renderOutput();
});

// ===== FUNGSI UTAMA =====
async function loadPetugas() {
  try {
    const response = await fetch(CONFIG.PETUGAS_URL);
    if (!response.ok) throw new Error('Gagal mengambil data petugas');
    const text = await response.text();
    state.petugasList = text.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.error('Error:', error);
    alert('Error: ' + error.message);
  }
}

function initCalendar() {
  const calendarEl = document.getElementById('calendar');
  calendarEl.innerHTML = '';
  
  const today = new Date();
  const firstDay = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, 0).getDate();

  // Tambahkan hari kosong
  for (let i = 0; i < firstDay; i++) {
    calendarEl.appendChild(createDayElement(null));
  }

  // Tambahkan hari dalam bulan
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = formatDateString(state.currentDate.getFullYear(), state.currentDate.getMonth(), d);
    const dayOfWeek = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), d).getDay();
    const isToday = isSameDay(today, new Date(state.currentDate.getFullYear(), state.currentDate.getMonth(), d));
    
    calendarEl.appendChild(createDayElement(d, dateStr, dayOfWeek, isToday));
  }
}

// ===== FUNGSI BANTUAN =====
function formatDateString(year, month, day) {
  return `${year}-${padZero(month + 1)}-${padZero(day)}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() && 
         date1.getMonth() === date2.getMonth() && 
         date1.getDate() === date2.getDate();
}

// ... (Lanjutkan dengan fungsi lainnya seperti createDayElement, renderOutput, dll.)