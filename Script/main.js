// Mengambil elemen yang dibutuhkan
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Menambahkan event listener saat tombol diklik
hamburger.addEventListener('click', () => {
    // Toggle class 'active' pada menu dan tombol
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fitur tambahan: Menu tertutup otomatis saat link diklik
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

/* =========================================
   LOGIKA KALKULATOR GULA
   ========================================= */

// Variabel Global
let sugarModifier = 1; // Default: Normal (x1)

// 1. Fungsi Counter (Tambah/Kurang Gelas)
const btnMinus = document.getElementById('btnMinus');
const btnPlus = document.getElementById('btnPlus');
const qtyInput = document.getElementById('qtyInput');

if(btnMinus && btnPlus && qtyInput) {
    btnMinus.addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if(val > 1) qtyInput.value = val - 1;
    });

    btnPlus.addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        qtyInput.value = val + 1;
    });
}

// 2. Fungsi Set Level Gula (Dipanggil saat tombol level diklik)
function setLevel(modifier, element) {
    sugarModifier = modifier;
    
    // Hapus kelas 'active' dari semua tombol
    document.querySelectorAll('.lvl-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Tambah kelas 'active' ke tombol yang diklik
    element.classList.add('active');
}

// 3. FUNGSI UTAMA: HITUNG GULA
function hitungGula() {
    // Ambil nilai dari input
    const drinkSelect = document.getElementById('drinkSelect');
    const baseSugar = parseInt(drinkSelect.value); // Nilai gula dasar dari 'value' option
    const quantity = parseInt(document.getElementById('qtyInput').value);
    
    // Rumus: (Gula Dasar x Jumlah Gelas) x Level Gula
    const totalSugar = Math.round((baseSugar * quantity) * sugarModifier);
    
    // Update Teks Hasil
    const totalText = document.getElementById('totalSugarText');
    const statusBadge = document.getElementById('statusBadge');
    const resultCard = document.getElementById('resultCard');
    const factText = document.getElementById('factText');

    totalText.innerText = `${totalSugar} gram`;

    // Logika Feedback (Warna & Pesan)
    resultCard.className = 'info-card'; // Reset warna

    if (totalSugar === 0) {
        // Kasus 0 Gram
        resultCard.classList.add('bg-green'); // Kita perlu tambah CSS bg-green nanti
        totalText.style.color = '#2E7D32';
        statusBadge.className = 'badge-success'; // Perlu CSS baru
        statusBadge.innerText = 'Super Sehat! 🌱';
        statusBadge.style.backgroundColor = '#C8E6C9';
        statusBadge.style.color = '#1B5E20';
        factText.innerText = "Keren! Kamu bebas gula tambahan hari ini. Kulit makin glowing dan energi lebih stabil!";
        
    } else if (totalSugar <= 26) {
        // Kasus Aman (Di bawah batas WHO)
        resultCard.classList.add('bg-blue');
        totalText.style.color = '#1565C0';
        statusBadge.className = 'badge-success';
        statusBadge.innerText = 'Masih Aman 👍';
        statusBadge.style.backgroundColor = '#BBDEFB';
        statusBadge.style.color = '#0D47A1';
        factText.innerText = "Asupan gulamu masih dalam batas wajar WHO. Pertahankan pola makan sehat ini ya!";

    } else {
        // Kasus Bahaya (Di atas batas WHO)
        resultCard.classList.add('bg-yellow'); // Kuning kemerahan
        totalText.style.color = '#D32F2F';
        statusBadge.className = 'badge-danger';
        statusBadge.innerText = 'Terlalu Berlebih! 🚨';
        statusBadge.style.backgroundColor = '#FFEBEE';
        statusBadge.style.color = '#D32F2F';
        
        // Feedback Spesifik
        if(totalSugar > 50) {
            factText.innerText = `Waduh! ${totalSugar}g itu setara dengan makan 12 sendok teh gula langsung! Hati-hati risiko diabetes mengintai. 😱`;
        } else {
            factText.innerText = "Ups, kamu sudah melebihi batas harian 26g. Kurangi yang manis-manis untuk sisa hari ini ya!";
        }
    }
}