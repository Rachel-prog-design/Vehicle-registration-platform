import { useState } from 'react';

export default function Tabs({ tabs }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: '1rem' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            style={{
              padding: '10px 20px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontWeight: active === i ? 700 : 400,
              borderBottom: active === i ? '2px solid #3b82f6' : 'none',
              color: active === i ? '#3b82f6' : '#64748b',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  );
}