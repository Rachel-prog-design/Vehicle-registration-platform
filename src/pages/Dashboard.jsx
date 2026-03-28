import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useVehicles, useDeleteVehicle } from '../hooks/useVehicles';
import Modal from '../components/Modal';
import { showSuccess, show422Errors } from '../components/Toast';

export default function Dashboard() {
  const { data: vehicles, isLoading } = useVehicles();
  const deleteMutation = useDeleteVehicle();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    deleteMutation.mutate(deleteId, {
      onSuccess: () => { showSuccess('Vehicle deleted'); setDeleteId(null); },
      onError: (err) => { show422Errors(err); setDeleteId(null); },
    });
  };

  if (isLoading) return <p style={{ padding: '2rem' }}>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2>Dashboard</h2>
        <button onClick={() => navigate('/vehicle/new')}
          style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          + Register Vehicle
        </button>
      </div>

      <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <strong>Total Vehicles:</strong> {vehicles?.length ?? 0}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={th}>Manufacture</th>
            <th style={th}>Model</th>
            <th style={th}>Year</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles?.map((v) => (
            <tr key={v.id}>
              <td style={td}>{v.manufacture}</td>
              <td style={td}>{v.model}</td>
              <td style={td}>{v.year}</td>
              <td style={td}>
                <button onClick={() => navigate(`/vehicle/${v.id}`)}
                  style={{ marginRight: '8px', padding: '4px 10px', borderRadius: '4px', border: '1px solid #3b82f6', color: '#3b82f6', cursor: 'pointer', background: 'none' }}>
                  View
                </button>
                <button onClick={() => setDeleteId(v.id)}
                  style={{ padding: '4px 10px', borderRadius: '4px', border: 'none', background: 'red', color: 'white', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this vehicle? This action cannot be undone."
      />
    </div>
  );
}

const th = { padding: '10px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' };
const td = { padding: '10px', borderBottom: '1px solid #e2e8f0' };