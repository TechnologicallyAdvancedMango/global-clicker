const supabase = require('../lib/supabaseClient');
const express = require('express');
const router = express.Router();
const { storeClick, getClicks } = require('../lib/clickStorage');

router.post('/', async (req, res) => {
  try {
    const result = await storeClick(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await getClicks();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/ping', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('clicks')
      .select('*')
      .limit(1);

    if (error) throw error;

    res.status(200).json({ success: true, message: 'Supabase connected!', sample: data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
