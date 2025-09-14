import React, { useState, useEffect } from 'react';
import { getAudiencePreview } from '../services/api';

const AudiencePreview = ({ rules, setPreviewData }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (rules.length > 0) {
      const timer = setTimeout(() => {
        fetchPreview();
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setPreview(null);
    }
  }, [rules]);

  const fetchPreview = async () => {
    setLoading(true);
    try {
      const data = await getAudiencePreview(rules);
      setPreview(data);
      setPreviewData(data);
    } catch (error) {
      console.error('Error fetching audience preview:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="audience-preview">
      <h3>Audience Preview</h3>
      
      {loading ? (
        <div>Calculating audience size...</div>
      ) : preview ? (
        <div className="preview-result">
          <p>This segment will include approximately <strong>{preview.audience_size} customers</strong>.</p>
          <div className="sample-customers">
            <h4>Sample Customers:</h4>
            <ul>
              {preview.sample_customers && preview.sample_customers.map((customer, index) => (
                <li key={index}>{customer.name} - {customer.email}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>Add rules to see audience preview</div>
      )}
    </div>
  );
};

export default AudiencePreview;