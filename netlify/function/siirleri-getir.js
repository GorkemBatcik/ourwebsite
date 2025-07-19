import { neon } from '@netlify/neon';
const sql = neon();

export default async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM poems ORDER BY created_at DESC`;
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Şiirleri çekerken hata:", err);
    return res.status(500).json({ error: 'Veritabanı hatası' });
  }
};