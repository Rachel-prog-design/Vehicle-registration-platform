import { useParams } from 'react-router-dom';
import Tabs from '../components/Tabs';
import { useVehicleInfo, useVehicleOwner, useVehicleReg, useVehicleIns } from '../hooks/useVehicles';

function Section({ data, isLoading }) {
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data found.</p>;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      {Object.entries(data).map(([key, val]) => (
        <div key={key} style={{ padding: '10px', background: '#f8fafc', borderRadius: '6px' }}>
          <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>{key}</strong>
          <span>{String(val)}</span>
        </div>
      ))}
    </div>
  );
}

export default function VehicleDetails() {
  const { id } = useParams();
  const info = useVehicleInfo(id);
  const owner = useVehicleOwner(id);
  const reg = useVehicleReg(id);
  const ins = useVehicleIns(id);

  const tabs = [
    { label: 'Info',         content: <Section data={info.data}  isLoading={info.isLoading} /> },
    { label: 'Owner',        content: <Section data={owner.data} isLoading={owner.isLoading} /> },
    { label: 'Registration', content: <Section data={reg.data}   isLoading={reg.isLoading} /> },
    { label: 'Insurance',    content: <Section data={ins.data}   isLoading={ins.isLoading} /> },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Vehicle Details</h2>
      <Tabs tabs={tabs} />
    </div>
  );
}