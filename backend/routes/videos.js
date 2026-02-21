const router = require('express').Router();
const supabase = require('../supabase');
const auth = require('../middleware/auth');

// GET all videos (optionally filtered by type)
router.get('/', async (req, res) => {
  let query = supabase.from('portfolio_videos').select('*').order('sort_order');
  if (req.query.type) query = query.eq('type', req.query.type);
  const { data, error } = await query;
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// CREATE video
router.post('/', auth, async (req, res) => {
  const { data, error } = await supabase.from('portfolio_videos').insert([req.body]).select().single();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// UPDATE video
router.put('/:id', auth, async (req, res) => {
  const { data, error } = await supabase.from('portfolio_videos').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// DELETE video
router.delete('/:id', auth, async (req, res) => {
  const { error } = await supabase.from('portfolio_videos').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error });
  res.json({ success: true });
});

module.exports = router;