const router = require('express').Router();
const supabase = require('../supabase');
const auth = require('../middleware/auth');

// GET profile
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('profile').select('*').eq('id', 1).single();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// UPDATE profile
router.put('/', auth, async (req, res) => {
  const { name, profile_picture_url, instagram_url, twitter_url, telegram_url, email } = req.body;
  const { data, error } = await supabase.from('profile').update({
    name, profile_picture_url, instagram_url, twitter_url, telegram_url, email
  }).eq('id', 1).select().single();
  if (error) return res.status(500).json({ error });
  res.json(data);
});

module.exports = router;