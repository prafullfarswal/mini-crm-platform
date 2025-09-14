import React from 'react';

const RuleBuilder = ({ rules, setRules }) => {
  const addRule = () => {
    setRules([...rules, { field: 'total_spent', operator: 'greater_than', value: '' }]);
  };

  const updateRule = (index, key, value) => {
    const newRules = [...rules];
    newRules[index][key] = value;
    setRules(newRules);
  };

  const removeRule = (index) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  return (
    <div className="rule-builder">
      <h3>Define Audience Rules</h3>
      
      {rules.map((rule, index) => (
        <div key={index} className="rule">
          <select
            value={rule.field}
            onChange={(e) => updateRule(index, 'field', e.target.value)}
          >
            <option value="total_spent">Total Spent</option>
            <option value="visit_count">Visit Count</option>
            <option value="last_activity_days">Days Since Last Activity</option>
            <option value="country">Country</option>
          </select>
          
          <select
            value={rule.operator}
            onChange={(e) => updateRule(index, 'operator', e.target.value)}
          >
            <option value="greater_than">Greater Than</option>
            <option value="less_than">Less Than</option>
            <option value="equals">Equals</option>
            <option value="not_equals">Not Equals</option>
          </select>
          
          <input
            type="text"
            value={rule.value}
            onChange={(e) => updateRule(index, 'value', e.target.value)}
            placeholder="Value"
          />
          
          <button onClick={() => removeRule(index)} className="btn-remove">
            Remove
          </button>
        </div>
      ))}
      
      <button onClick={addRule} className="btn-add-rule">
        + Add Rule
      </button>
    </div>
  );
};

export default RuleBuilder;