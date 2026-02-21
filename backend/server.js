require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/showreel',require('./routes/showreel'));
app.use('/api/videos',  require('./routes/videos'));
app.use('/api/upload',  require('./routes/upload'));

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Catch-all route for SPA - must be last
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));