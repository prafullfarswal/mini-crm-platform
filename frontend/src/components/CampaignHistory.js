import React, { useState, useEffect } from 'react';
import { getCampaigns } from '../services/api';

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await getCampaigns();
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      // For development, use mock data
      setCampaigns([
        {
          id: 1,
          segment_name: 'High Spenders',
          audience_size: 150,
          sent_count: 135,
          failed_count: 15,
          ai_insights: 'Your campaign reached 150 users. 135 messages were successfully delivered (90% success rate).',
          created_at: '2023-10-15T10:30:00.000Z'
        },
        {
          id: 2,
          segment_name: 'Inactive Users',
          audience_size: 75,
          sent_count: 68,
          failed_count: 7,
          ai_insights: 'Your campaign reached 75 users. 68 messages were successfully delivered (90.7% success rate).',
          created_at: '2023-10-10T14:20:00.000Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  return (
    <div className="campaign-history">
      <h1>Campaign History</h1>
      
      {campaigns.length === 0 ? (
        <p>No campaigns yet. Create your first segment to launch a campaign.</p>
      ) : (
        <div className="campaigns-list">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="campaign-card">
              <h3>{campaign.segment_name}</h3>
              <p className="campaign-date">{new Date(campaign.created_at).toLocaleDateString()}</p>
              
              <div className="campaign-stats">
                <div className="stat">
                  <span className="stat-label">Audience Size:</span>
                  <span className="stat-value">{campaign.audience_size}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Sent:</span>
                  <span className="stat-value">{campaign.sent_count}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Failed:</span>
                  <span className="stat-value">{campaign.failed_count}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Success Rate:</span>
                  <span className="stat-value">
                    {((campaign.sent_count / campaign.audience_size) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="ai-insights">
                <h4>AI Insights</h4>
                <p>{campaign.ai_insights || "No insights available"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignHistory;