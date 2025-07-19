import { neon } from '@netlify/neon';
const sql = neon();

export default async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Yalnızca PUT istekleri desteklenir.' });
  }

  const { id, baslik, icerik } = req.body;

  if (!id || !baslik || !icerik) {
    return res.status(400).json({ error: 'ID, başlık ve içerik zorunlu' });
  }

  await sql`
    UPDATE poems
    SET baslik = ${baslik}, icerik = ${icerik}
    WHERE id = ${id}
  `;
  return res.status(200).json({ message: 'Şiir güncellendi' });
};