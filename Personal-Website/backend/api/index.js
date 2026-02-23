// Vercel Serverless Function — standalone (no NestJS build required)
const { createClient } = require('@supabase/supabase-js');

let supabase;

function getSupabase() {
  if (!supabase) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
    }
    supabase = createClient(url, key);
  }
  return supabase;
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const client = getSupabase();

    // GET /guestbook — fetch all entries
    if (req.method === 'GET') {
      const { data, error } = await client
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(200).json(data);
    }

    // POST /guestbook — create new entry
    if (req.method === 'POST') {
      const { name, message } = req.body || {};
      if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
      }

      const { data, error } = await client
        .from('guestbook')
        .insert([{ name, message }])
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Serverless function error:', err);
    return res.status(500).json({ error: err.message });
  }
};
