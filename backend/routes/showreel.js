const router = require('express').Router();
const supabase = require('../supabase');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('showreel').select('*').eq('id', 1).single();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

router.put('/', auth, async (req, res) => {
  const { video_url } = req.body;
  const { data, error } = await supabase.from('showreel').update({ video_url }).eq('id', 1).select().single();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

module.exports = router;