import { neon } from '@netlify/neon';
const sql = neon();

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteği kabul edilir' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: 'Geçersiz JSON verisi' });
    }
  }

  const { baslik, icerik } = body;

  if (!baslik || !icerik) {
    return res.status(400).json({ error: 'Boş bırakma dostum' });
  }

  try {
    await sql`INSERT INTO poems (baslik, icerik) VALUES (${baslik}, ${icerik})`;
    return res.status(200).json({ message: 'Şiir kaydedildi!' });
  } catch (err) {
    console.error('Veri kaydederken hata:', err);
    return res.status(500).json({ error: 'Veritabanı hatası' });
  }
};