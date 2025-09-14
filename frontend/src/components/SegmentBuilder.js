import React, { useState } from 'react';
import RuleBuilder from './RuleBuilder';
import AudiencePreview from './AudiencePreview';
import { createSegment } from '../services/api';

const SegmentBuilder = () => {
  const [rules, setRules] = useState([]);
  const [segmentName, setSegmentName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const handleSaveSegment = async () => {
    if (!segmentName || rules.length === 0) {
      alert('Please provide a segment name and at least one rule');
      return;
    }

    setIsSaving(true);
    try {
      const segment = {
        name: segmentName,
        rules: rules
      };
      
      const result = await createSegment(segment);
      alert('Segment created successfully!');
      // Redirect to campaign history
      window.location.href = '/campaign-history';
    } catch (error) {
      console.error('Error saving segment:', error);
      alert('Failed to save segment');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="segment-builder">
      <h1>Create Customer Segment</h1>
      
      <div className="segment-form">
        <div className="form-group">
          <label htmlFor="segmentName">Segment Name</label>
          <input
            type="text"
            id="segmentName"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Enter segment name"
          />
        </div>

        <RuleBuilder rules={rules} setRules={setRules} />
        
        <AudiencePreview rules={rules} setPreviewData={setPreviewData} />
        
        <div className="actions">
          <button 
            onClick={handleSaveSegment} 
            disabled={isSaving}
            className="btn-primary"
          >
            {isSaving ? 'Saving...' : 'Save Segment & Launch Campaign'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SegmentBuilder;