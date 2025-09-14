# Mini CRM Platform 

A comprehensive Customer Relationship Management system built with **React.js**, **Node.js**, and **MySQL**. This platform enables customer segmentation, personalized campaign delivery.

## Features

### Core Functionality
- **Customer Segmentation** - Dynamic rule builder with AND/OR logic
- **Campaign Management** - Automated campaign creation and tracking
- **Real-time Analytics** - Live audience preview and performance metrics
- **AI-Powered Insights** - Automated campaign analysis and recommendations

### Authentication
- **Google OAuth 2.0** - Secure enterprise-grade authentication
- **Developer Mode** - Quick login for testing and development
- **Session Management** - Persistent user sessions

### Analytics & Reporting
- Audience size prediction
- Campaign success/failure rates
- Delivery statistics
- AI-generated performance insights

## Tech Stack

### Frontend
- **React.js 18** - Modern UI framework
- **React Router** - Navigation and routing
- **Context API** - State management
- **Google OAuth** - Authentication
- **Axios** - API communication
- **CSS3** - Responsive styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL 8** - Relational database
- **JWT** - Authentication tokens
- **Google Auth Library** - OAuth integration

### Database
- **MySQL** with 5 main tables:
  - `users` - Authentication and user data
  - `customers` - Customer information and activity
  - `segments` - Segmentation rules
  - `campaigns` - Campaign data and metrics
  - `communication_logs` - Message delivery records

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8 or higher)
- Google OAuth credentials

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/prafullfarswal/mini-crm-platform.git
   cd mini-crm-platform
2. **Backend Setup**
   ```bash
   cd backend
   npm install

   # Setup environment variables
   cp .env.example .env
   # Edit .env with your database credentials

   # Initialize database
   mysql -u root -p < ../database/schema.sql

   # Start backend server
   npm run dev
3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
4. **Access Application**
   Frontend: http://localhost:3000
   Backend API: http://localhost:5000
