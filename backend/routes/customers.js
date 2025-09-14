const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { auth } = require('../middleware/auth');

// Get all customers
router.get('/', auth, async (req, res) => {
  try {
    const [customers] = await db.execute('SELECT * FROM customers');
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Create a new customer
router.post('/', auth, async (req, res) => {
  const { name, email, total_spent, visit_count, last_activity_date, country } = req.body;
  
  try {
    const [result] = await db.execute(
      'INSERT INTO customers (name, email, total_spent, visit_count, last_activity_date, country) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, total_spent, visit_count, last_activity_date, country]
    );
    
    res.json({
      success: true,
      customerId: result.insertId
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;