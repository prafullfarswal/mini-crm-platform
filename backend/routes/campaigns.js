const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { auth } = require('../middleware/auth');

// Get all campaigns for the authenticated user
router.get('/', auth, async (req, res) => {
  const userId = req.user.id;
  
  try {
    const [campaigns] = await db.execute(
      `SELECT c.*, s.name as segment_name 
       FROM campaigns c 
       JOIN segments s ON c.segment_id = s.id 
       WHERE c.user_id = ? 
       ORDER BY c.created_at DESC`,
      [userId]
    );
    
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;