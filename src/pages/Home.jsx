import { useNavigate } from 'react-router-dom';
import { useVehicles } from '../hooks/useVehicles';

export default function Home() {
  const { data: vehicles, isLoading, isError } = useVehicles();
  const navigate = useNavigate();

  if (isLoading) return <p style={{ padding: '2rem' }}>Loading vehicles...</p>;
  if (isError) return <p style={{ padding: '2rem', color: 'red' }}>Failed to load vehicles.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Registered Vehicles</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={th}>ID</th>
            <th style={th}>Manufacture</th>
            <th style={th}>Model</th>
            <th style={th}>Year</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles?.map((v) => (
            <tr key={v.id} onClick={() => navigate(`/vehicle/${v.id}`)} style={{ cursor: 'pointer' }}>
              <td style={td}>{v.id}</td>
              <td style={td}>{v.manufacture}</td>
              <td style={td}>{v.model}</td>
              <td style={td}>{v.year}</td>
              <td style={td}>{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = { padding: '10px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' };
const td = { padding: '10px', borderBottom: '1px solid #e2e8f0' };