import { neon } from '@netlify/neon';
const sql = neon();

export default async (req, res) => {
  const rows = await sql`SELECT * FROM poems ORDER BY created_at DESC`;
  return res.status(200).json(rows);
};