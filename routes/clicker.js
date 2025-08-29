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

module.exports = router;