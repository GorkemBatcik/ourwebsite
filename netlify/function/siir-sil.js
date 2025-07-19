import { neon } from '@netlify/neon';
const sql = neon();

export default async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Yalnızca DELETE istekleri desteklenir.' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID gerekli' });
  }

  await sql`DELETE FROM poems WHERE id = ${id}`;
  return res.status(200).json({ message: 'Şiir silindi' });
};