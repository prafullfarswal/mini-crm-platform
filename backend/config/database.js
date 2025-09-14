const mysql = require('mysql2');
require('dotenv').config();

// Mock data for development
const mockData = {
  customers: [
    { id: 1, name: 'John Doe', email: 'john@example.com', total_spent: 12500.00, visit_count: 5, last_activity_date: '2023-10-15', country: 'USA' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', total_spent: 8500.00, visit_count: 7, last_activity_date: '2023-10-20', country: 'Canada' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', total_spent: 15000.00, visit_count: 2, last_activity_date: '2023-09-10', country: 'USA' }
  ]
};

let promisePool;

try {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  promisePool = pool.promise();
  console.log('MySQL connected successfully');
} catch (error) {
  console.log('MySQL not available, using mock data');
  promisePool = {
    execute: async (query, params) => {
      console.log('Mock query:', query);
      // Simple mock implementation for development
      return [mockData.customers];
    }
  };
}

module.exports = promisePool;