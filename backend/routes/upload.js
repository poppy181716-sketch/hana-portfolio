const router = require('express').Router();
const multer = require('multer');
const supabase = require('../supabase');
const auth = require('../middleware/auth');

const upload = multer({ storage: multer.memoryStorage() });

// Upload any file to a specific bucket
router.post('/:bucket', auth, upload.single('file'), async (req, res) => {
  const { bucket } = req.params;
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const fileName = `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;

  const { error } = await supabase.storage.from(bucket).upload(fileName, file.buffer, {
    contentType: file.mimetype,
    upsert: true
  });

  if (error) return res.status(500).json({ error });

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  res.json({ url: data.publicUrl });
});

module.exports = router;
