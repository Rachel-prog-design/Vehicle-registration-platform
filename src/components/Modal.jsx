export default function Modal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '400px', width: '100%' }}>
        <h3 style={{ marginBottom: '1rem' }}>Confirm Action</h3>
        <p style={{ marginBottom: '1.5rem' }}>{message}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{ padding: '8px 16px', borderRadius: '6px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}