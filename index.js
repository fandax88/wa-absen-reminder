const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

console.log("Memulai bot...");

// Menggunakan LocalAuth untuk menyimpan sesi agar tidak perlu scan QR berulang kali
const client = new Client({
    authStrategy: new LocalAuth()
});

// Menampilkan QR code di terminal saat pertama kali dijalankan
client.on('qr', (qr) => {
    console.log('QR Code diterima, silakan scan:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot WhatsApp sudah siap!');
    // Memulai penjadwalan setelah bot siap
    scheduleMessages();
});

// Variabel untuk menyimpan ID grup yang sudah mengaktifkan bot
// Menggunakan Set agar tidak ada ID grup yang duplikat
const activeGroups = new Set();

// Mendengarkan pesan yang masuk
client.on('message_create', async (msg) => {
    // Memeriksa apakah pesan adalah '!start' dan berasal dari grup
    if (msg.body.toLowerCase() === '!start' && msg.from.endsWith('@g.us')) {
        const chat = await msg.getChat();
        if (chat.isGroup) {
            // Menambahkan ID grup ke dalam daftar aktif
            if (!activeGroups.has(msg.from)) {
                activeGroups.add(msg.from);
                console.log(`Bot diaktifkan untuk grup: ${chat.name} (${msg.from})`);
                // Mengirim pesan konfirmasi ke grup
                client.sendMessage(msg.from, '✅ Bot pengingat absen berhasil diaktifkan! Saya akan mengingatkan setiap hari pada pukul 07:55 dan 17:00.');
            } else {
                client.sendMessage(msg.from, 'ℹ️ Bot sudah aktif di grup ini.');
            }
        }
    }
});

function scheduleMessages() {
    console.log("Penjadwalan pesan diaktifkan.");

    // Pesan Pagi (07:55 WIB)
    const morningMessage = `☀️ Selamat Pagi! ☀️

Yuk, jangan lupa absen masuk di e-office sebelum jam 8 pagi ya.
Klik link ini: https://192.168.95.60:8001

Terima kasih dan semangat untuk hari ini! ✨`;

    // Pesan Sore (17:00 WIB)
    const eveningMessage = `Waktunya Pulang! 🏡

Jangan lupa absen keluar di e-office yaa.
Link: https://192.168.95.60:8001

Terima kasih untuk hari ini, sampai jumpa besok! 👋`;

    // Jadwal untuk pesan pagi jam 07:55 setiap hari
    // Format cron: 'menit jam * * hari_dalam_minggu'
    cron.schedule('55 7 * * *', () => {
        console.log("Mengirim pesan pagi ke grup yang aktif...");
        activeGroups.forEach(groupId => {
            client.sendMessage(groupId, morningMessage);
            console.log(`Pesan pagi terkirim ke ${groupId}`);
        });
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta" // Otomatis menggunakan zona waktu WIB
    });

    // Jadwal untuk pesan sore jam 17:00 setiap hari
    cron.schedule('0 17 * * *', () => {
        console.log("Mengirim pesan sore ke grup yang aktif...");
        activeGroups.forEach(groupId => {
            client.sendMessage(groupId, eveningMessage);
            console.log(`Pesan sore terkirim ke ${groupId}`);
        });
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta" // Otomatis menggunakan zona waktu WIB
    });
}

// Inisialisasi client
client.initialize();
