CREATE DATABASE IF NOT EXISTS mini_crm;
USE mini_crm;

-- Users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  picture TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  total_spent DECIMAL(10, 2) DEFAULT 0,
  visit_count INT DEFAULT 0,
  last_activity_date DATE,
  country VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Segments table
CREATE TABLE IF NOT EXISTS segments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rules JSON NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  segment_id INT NOT NULL,
  audience_size INT NOT NULL,
  sent_count INT DEFAULT 0,
  failed_count INT DEFAULT 0,
  status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
  ai_insights TEXT,
  user_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (segment_id) REFERENCES segments(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Communication logs table
CREATE TABLE IF NOT EXISTS communication_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  campaign_id INT NOT NULL,
  customer_id INT NOT NULL,
  status ENUM('sent', 'failed') NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Insert sample data
INSERT INTO customers (name, email, total_spent, visit_count, last_activity_date, country) VALUES
('John Doe', 'john@example.com', 12500.00, 5, '2023-10-15', 'USA'),
('Jane Smith', 'jane@example.com', 8500.00, 7, '2023-10-20', 'Canada'),
('Bob Johnson', 'bob@example.com', 15000.00, 2, '2023-09-10', 'USA'),
('Alice Brown', 'alice@example.com', 5000.00, 10, '2023-10-25', 'UK'),
('Charlie Wilson', 'charlie@example.com', 20000.00, 3, '2023-08-05', 'USA');