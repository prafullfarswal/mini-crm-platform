const express = require('express');
const router = express.Router();

// Temporary auth endpoint for development
router.post('/google', (req, res) => {
  res.json({
    success: true,
    user: {
      id: 'dev-user-123',
      email: 'developer@example.com',
      name: 'Developer User',
      picture: null
    }
  });
});

module.exports = router;