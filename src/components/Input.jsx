export default function Input({ label, error, register, name, type = 'text', ...rest }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500 }}>{label}</label>
      <input
        type={type}
        {...register(name)}
        {...rest}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: `1px solid ${error ? 'red' : '#cbd5e1'}`,
          borderRadius: '6px',
          outline: 'none',
          fontSize: '14px',
        }}
      />
      {error && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{error.message}</p>}
    </div>
  );
}