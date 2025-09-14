// Temporary auth middleware for development
const auth = (req, res, next) => {
  req.user = {
    id: 'dev-user-123',
    email: 'developer@example.com',
    name: 'Developer User'
  };
  next();
};

module.exports = { auth };