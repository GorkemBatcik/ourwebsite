import { neon } from '@netlify/neon';
const sql = neon();

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteği kabul edilir' });
  }

  const { baslik, icerik } = req.body;

  if (!baslik || !icerik) {
    return res.status(400).json({ error: 'Boş bırakma dostum' });
  }

  await sql`INSERT INTO poems (baslik, icerik) VALUES (${baslik}, ${icerik})`;
  return res.status(200).json({ message: 'Şiir kaydedildi!' });
};