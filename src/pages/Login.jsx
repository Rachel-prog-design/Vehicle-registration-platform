import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const success = login(data.email, data.password);
    if (!success) {
      setError('root', { message: 'Invalid credentials' });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <input {...register('email', { required: 'Email is required' })}
            style={{ display: 'block', width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', marginTop: '4px' }}
          />
          {errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{errors.email.message}</p>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
          <input type="password" {...register('password', { required: 'Password is required' })}
            style={{ display: 'block', width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', marginTop: '4px' }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</p>}
        </div>

        {errors.root && <p style={{ color: 'red', marginBottom: '1rem' }}>{errors.root.message}</p>}

        <button type="submit" style={{ width: '100%', padding: '10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}