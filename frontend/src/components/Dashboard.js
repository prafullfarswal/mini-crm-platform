import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>Customer Segmentation</h2>
          <p>Create targeted customer segments based on rules</p>
          <Link to="/segment-builder" className="btn-primary">
            Build Segments
          </Link>
        </div>
        
        <div className="dashboard-card">
          <h2>Campaign History</h2>
          <p>View past campaigns and their performance</p>
          <Link to="/campaign-history" className="btn-primary">
            View Campaigns
          </Link>
        </div>
        
        <div className="dashboard-card">
          <h2>Analytics</h2>
          <p>View customer insights and campaign analytics</p>
          <button className="btn-primary" disabled>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;